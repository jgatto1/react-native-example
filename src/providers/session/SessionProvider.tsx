import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import * as Base64 from 'base-64';
import { LoginService } from 'containers/Login/Login2.service';
import { F, Res, validateResponse } from 'model/backend';
import { User } from 'model/backend/login';
import { showAlertIfNetworkError } from 'providers/error.alert';
import React, { useContext, useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';
import { BackendClient } from 'service/backend-client.service';
import { Session, SessionData, SessionHook } from './model';

const DEFAULT: Session = {
  login: () => console.error('No context created to login()'),
  logout: () => console.error('No context created to logout()'),
  updateUserData: () => console.error('No context created to updateUserData()'),
  setUserSubscribed: () => console.error('No context created to setUserSubscribed()'),
};

export const SessionContext = React.createContext<Session>(DEFAULT);

export const useSession = (): SessionHook => {
  const session = useContext(SessionContext);
  return {
    ...session,
    isLogged: !!session.data,
    onboarded: !!session.data?.user.settings.is_onboarded,
    userUUID: session.data?.user.uuid,
    isSubscribed: !!session.data?.subscribed,
    isExpired: !!session.data?.trial_expired,
  };
};

function saveOnStorage(session: SessionData) {
  AsyncStorage.setItem('session', JSON.stringify(session)).catch((err: any) =>
    console.error('Cannot set session on storage', err)
  );
}

interface DecodedToken {
  exp: number;
}

function decodeToken(token: any): DecodedToken | null {
  const splitToken = typeof token === 'string' ? token.split('.') : null;

  if (!splitToken) {
    return null;
  }

  const base64: string = splitToken[1].replace('-', '+').replace('_', '/');

  return JSON.parse(Base64.decode(base64)) as DecodedToken;
}

async function tryRefreshSession(session: SessionData) {
  if (!session.refreshToken) {
    throw new Error('No refresh token into session data');
  }
  const refresh_token = session.refreshToken;
  return BackendClient.post<Res<F<'user', User> & F<'access_token', string>>>('/login_refresh', { refresh_token })
    .then(validateResponse)
    .then(async (data) => {
      const newSessionData: SessionData = {
        ...session,
        accessToken: data.access_token,
        user: data.user,
      };
      await saveOnStorage(session);
      return newSessionData;
    });
}

async function retrieveSessionFromStorage() {
  const rawSession = await AsyncStorage.getItem('session');
  if (!rawSession) {
    throw new Error('No session stored in AsyncStorage');
  }
  const session = JSON.parse(rawSession as string) as SessionData;
  const token = decodeToken(session.accessToken);
  if ((token?.exp || 0) * 1000 < new Date().getTime()) {
    return await tryRefreshSession(session).catch(async (err) => {
      showAlertIfNetworkError(err);
      await AsyncStorage.removeItem('session').catch((e) => console.warn('Cannot delete expired session', e));
      throw new Error(`Token expired on ${token?.exp} and cannot refresh it`);
    });
  }
  // return session;
  const subscribed = await isRevenueCatUserSubscribed(session.user.uuid);
  const trial_expired = await isTrialExpired(session);
  console.debug('Fetched session from storage');
  return { ...session, subscribed, trial_expired };
}

const isRevenueCatUserSubscribed = async (uuid: string | undefined) => {
  try {
    console.debug('uuid', uuid);
    if (uuid) {
      const { created, ...other } = await Purchases.logIn(uuid);
      console.debug('purchaserInfo', uuid, other, created);
      if (other.customerInfo.activeSubscriptions?.length > 0) {
        // has active subscriptions. set as subscribed
        console.debug('has active. Skipping paywall...', other);
        return true;
      } else {
        console.debug('has not any active.');
        return false;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const isTrialExpired = async (sessionData: SessionData | undefined) => {
  try {
    if (sessionData) {
      const trial_expired = await LoginService.isTrialPeriodPassed(sessionData as SessionData);
      return trial_expired;
    }
  } catch (e) {
    console.error(e);
  }
};

export const SessionProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<SessionData | undefined>();
  const [loading, setIsLoading] = useState(true);

  const setSessionData = (session: SessionData) => {
    BackendClient.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;
    setData(session);
  };

  useEffect(() => {
    retrieveSessionFromStorage()
      .then((session) => {
        BackendClient.defaults.headers.common.cookies = `session=${session.accessToken}`;
        setSessionData(session);
      })
      .catch((err) => console.warn('Not valid session on storage', err))
      .finally(() => setIsLoading(false));
  }, []);

  const logout = () => {
    Sentry.setUser(null);
    AsyncStorage.removeItem('session')
      .then(() => {
        BackendClient.defaults.headers.common.cookies = null;
        BackendClient.defaults.headers.common.Authorization = null;
        setData(undefined);
      })
      .catch((err: any) => console.error('Cannot clear session data', err));
  };

  const login = async (newData: SessionData) => {
    try {
      Sentry.setUser({ id: newData.user.uuid, email: newData.user.email, username: newData.user.study_initials });
      const subscribed = await isRevenueCatUserSubscribed(newData.user.uuid);
      const trial_expired = await isTrialExpired(newData);
      saveOnStorage({ ...newData, subscribed, trial_expired });
      setSessionData({ ...newData, subscribed, trial_expired });
    } catch (error) {
      console.error('Cannot loggin', error);
    }
  };

  const updateUserData = (user: User) => {
    const newData = {
      ...(data as SessionData),
      name: user.settings.display_name,
      lastName: user.last_name || '',
      user: user,
    };
    login(newData);
  };

  const setUserSubscribed = () => {
    saveOnStorage({ ...(data as SessionData), subscribed: true });
    setSessionData({ ...(data as SessionData), subscribed: true });
  };

  const session: Session = { login, logout, data, loading, updateUserData, setUserSubscribed };

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
