import { SessionData } from 'providers/session/model';
import DeviceInfo from 'react-native-device-info';
import { BackendClient } from 'service/backend-client.service';
import { Login } from 'model/backend/login';
import { Res } from 'model/backend';
import messaging from '@react-native-firebase/messaging';
import { showAlertIfNetworkError } from 'providers/error.alert';

interface LoginCredentials {
  initials: string;
  number: string;
}

class LoginServiceImpl {
  login(credentials: LoginCredentials): Promise<SessionData> {
    const data = {
      study_id: credentials.number,
      study_initials: credentials.initials,
      app_version: `${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`,
    };
    return BackendClient.post<Login>('/login', data, { withCredentials: false })
      .then(async (loginRes) => {
        const fcmToken = await this.registerFcmToken(loginRes.data).catch((err) => {
          console.warn(`Cannot send FCM token ${err.message}`, err);
          return undefined;
        });
        return LoginServiceImpl.generateSessionData({ ...loginRes.data, fcmToken });
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
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

  private static generateSessionData(login: Login & { fcmToken?: string }): SessionData {
    return {
      accessToken: login.access_token,
      lastName: login.user.last_name || '',
      name: login.user.first_name || '',
      refreshToken: login.refresh_token || '',
      study: { id: login.user.study_id, initials: login.user.study_initials },
      user: login.user,
      fcmToken: login.fcmToken,
    };
  }
}

export const LoginService = new LoginServiceImpl();
