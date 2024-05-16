import { useSession } from '@providers/session/SessionProvider';
import { useLoginStyle } from 'containers/Login/Login.style';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { LoginForgotPassword } from './ForgotPassword/LoginForgotPassword';
import { LoginContextProvider, STATE, useLoginContext } from './Login.context';
import { LoginResetPassword } from './ResetPassword/LoginResetPassword';
import { LoginSignIn } from './SignIn/LoginSignIn';
import { LoginSignUp } from './SignUp/LoginSignUp';

const SCREENS: { [key in STATE]: React.VFC } = {
  SignIn: LoginSignIn,
  SignUp: LoginSignUp,
  ForgotPass: LoginForgotPassword,
  ResetPass: LoginResetPassword,
};

export const Login: React.VFC = () => {
  const session = useSession();
  const styles = useLoginStyle();

  if (session.loading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator color={styles.loadingIndicator.color} />
      </View>
    );
  }
  return (
    <LoginContextProvider>
      <LoginScreen />
    </LoginContextProvider>
  );
};

const LoginScreen: React.VFC = () => {
  const { state } = useLoginContext();

  const Screen = SCREENS[state];

  return <Screen />;
};
