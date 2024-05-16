import { Space, Text } from 'components';
import { useLoginContext } from 'containers/Login/Login.context';
import { LoginSocial } from 'containers/Login/Social/LoginSocial';
import React from 'react';
import { KeyboardAvoidingView, Pressable, View } from 'react-native';
import { LoginLayout } from '../LoginLayout';
import { useLoginLayoutWithSignUpStyles } from './LoginLayoutWithSignUp.styles';

export const LoginLayoutWithSignUp: React.FC<{ back?: boolean }> = ({ children, back }) => {
  const styles = useLoginLayoutWithSignUpStyles();

  const login = useLoginContext();

  return (
    <LoginLayout back={back}>
      <KeyboardAvoidingView>{children}</KeyboardAvoidingView>

      <Space margin={14} />
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
      </View>
      <Space margin={14} />

      <Space margin={5} />

      <LoginSocial />

      <Space margin={10} />

      <View style={styles.signUpContainer}>
        <Text center>Don't have an account?{'   '}</Text>
        <Pressable onPress={() => login.goTo('SignUp')}>
          <Text bold style={styles.signUp}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </LoginLayout>
  );
};
