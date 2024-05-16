import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NativeModules, Platform, StatusBar } from 'react-native';
import { SessionProvider, useSession } from 'providers/session/SessionProvider';
import { ThemeProvider } from 'providers/theme/ThemeProvider';
import { Login } from 'containers/Login/Login';
import { MainStack } from 'containers/Main/Main';
import { OnBoarding } from 'containers/OnBoarding/OnBoarding';
import { ARSupportedContextProvider } from 'providers/ar/support-ar.context';
import * as Sentry from '@sentry/react-native';
import { CaptureConsole } from '@sentry/integrations';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { Paywall } from 'containers/Paywall/Paywall';
import Purchases from 'react-native-purchases';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('FCM Authorization status:', authStatus);
  }
}

const initRevenueCat = async () => {
  try {
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
      Purchases.configure({
        apiKey: 'appl_QIYDWagycQevwrfPoyXYrldgtua',
      });
    } else if (Platform.OS === 'android') {
      Purchases.configure({
        apiKey: 'goog_WPAWXPYHYMAanScHnHOfhHPtrsi',
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const App = () => {
  if (__DEV__ && Platform.OS === 'ios') {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
  }

  useEffect(() => {
    initRevenueCat();
    requestUserPermission().catch((err) => console.log('Error while requesting notification permissions', err));
  }, []);

  return (
    <ARSupportedContextProvider>
      <SessionProvider>
        <ThemeProvider>
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} showHideTransition='fade' />
          <Content />
        </ThemeProvider>
      </SessionProvider>
    </ARSupportedContextProvider>
  );
};

const Content = () => {
  const session = useSession();

  // DEV: If you need to show immediately a custom container put direct return of this container
  // return <HomeAR />;
  // return <Paywall />;
  if (!session.isLogged) {
    return <Login />;
  }

  const email = session.data?.user.email || '';
  const isAllowedUserLogged = email.includes('virtualabvr') || email.includes('test');
  if (!session.isSubscribed && session.isExpired && !isAllowedUserLogged && !__DEV__) {
    return <Paywall />;
  }

  return session.onboarded ? <MainStack /> : <OnBoarding />;
};

Sentry.init({
  dsn: 'https://a1379977b03d4a8eaf4c0e2703f8d9a1@o1112558.ingest.sentry.io/6151986',
  tracesSampleRate: 1.0,
  environment: __DEV__ ? 'development' : 'production',
  integrations: [
    new CaptureConsole({
      levels: ['error', 'warn'],
    }),
  ],
  release: `${Platform.OS} ${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})${
    __DEV__ ? ' [development]' : ''
  }`,
});

export default Sentry.wrap(App);
