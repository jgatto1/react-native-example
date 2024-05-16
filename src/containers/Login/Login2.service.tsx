import { AppleRequestResponse } from '@invertase/react-native-apple-authentication';
import { Login } from 'model/backend/login';
import { SessionData } from 'providers/session/model';
import { BackendClient, BASE_URL_V2 } from 'service/backend-client.service';
import messaging from '@react-native-firebase/messaging';
import { Res } from 'model/backend';

interface LoginCredentials {
  initials: string;
  number: string;
}

class LoginServiceImpl2 {
  googleLogin(accessToken: string): Promise<SessionData> {
    const data = {
      access_token: accessToken,
      version: '1.1',
    };
    return BackendClient.post<Login>('/auth/google/login?app_version=1.1', data, {
      withCredentials: false,
      baseURL: BASE_URL_V2,
    })
      .then((response) => {
        console.log('Logged', response);
        return LoginServiceImpl2.generateSessionData(response.data);
      })
      .catch((err) => {
        console.warn(err);
        throw Error(err);
      });
  }

  facebookLogin(accessToken: string): Promise<SessionData> {
    const data = {
      access_token: accessToken,
      version: '1.1',
    };
    return BackendClient.post<Login>('/auth/facebook/login?app_version=1.1', data, {
      withCredentials: false,
      baseURL: BASE_URL_V2,
    })
      .then((response) => {
        console.log('Logged', response);
        return LoginServiceImpl2.generateSessionData(response.data);
      })
      .catch((err) => {
        console.warn(err.response);
        throw Error(err);
      });
  }

  appleLogin(appleResponse: AppleRequestResponse): Promise<SessionData> {
    const data = {
      app_version: '1.1',
      idToken: appleResponse.identityToken,
      email: appleResponse.email,
      userId: appleResponse.user,
      givenName: appleResponse.fullName?.givenName,
      familyName: appleResponse.fullName?.familyName,
    };
    return BackendClient.post<Login>('/auth/apple/login?app_version=1.1', data, {
      withCredentials: false,
      baseURL: BASE_URL_V2,
    })
      .then((loginRes) => {
        console.log('Logged', loginRes);
        return LoginServiceImpl2.generateSessionData(loginRes.data);
      })
      .catch((err) => {
        console.warn(err);
        throw Error(err);
      });
  }

  async registerFcmToken(data: Login): Promise<string> {
    const fcm_registration_token = await messaging().getToken();
    console.log(`Sending FCM token: ${fcm_registration_token}`);
    const headers = { Authorization: `Bearer ${data.access_token}` };
    await BackendClient.post<Res>('/fcm_registration_token/add', { fcm_registration_token }, { headers });
    return fcm_registration_token;
  }

  isTrialPeriodPassed(newData: SessionData): Promise<boolean> {
    return BackendClient.get('/is_trial_period_passed', {
      headers: { Authorization: `Bearer ${newData.accessToken}` },
      baseURL: BASE_URL_V2,
    })
      .then((trial) => {
        if (!trial.data.error) {
          console.debug('trial.trial_expired', trial.data.trial_expired);
          return trial.data.trial_expired;
        } else {
          throw Error('error is period passed');
        }
      })
      .catch((err) => {
        console.error('Cannot loggin', err);
        console.error('Cannot loggin', err.response);
        console.error('Cannot loggin', err.response.data);
        throw Error(err);
      });
  }

  login(credentials: any): Promise<SessionData> {
    const data = {
      [credentials.email ? 'email' : 'cell_phone']: credentials.email || credentials.cell_phone,
      password: credentials.password,
    };
    return BackendClient.post<Login>('/login', data, { withCredentials: false, baseURL: BASE_URL_V2 })
      .then(async (loginRes) => {
        console.log('Logged', loginRes);
        const fcmToken = await this.registerFcmToken(loginRes.data).catch((err) => {
          console.warn(`Cannot send FCM token ${err.message}`, err);
          return undefined;
        });
        return LoginServiceImpl2.generateSessionData({ ...loginRes.data, fcmToken });
      })
      .catch((err) => {
        console.warn(err);
        throw Error(err);
      });
  }

  private static generateSessionData(login: Login & { fcmToken?: string }): SessionData {
    return {
      accessToken: login.access_token,
      lastName: login.user.last_name || '',
      name: login.user.first_name || '',
      refreshToken: login.refresh_token || '',
      study: { id: login.user.study_id, initials: login.user.study_initials },
      user: login.user,
    };
  }
}

export const LoginService = new LoginServiceImpl2();
