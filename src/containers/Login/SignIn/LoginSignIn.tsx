import { useSession } from '@providers/session/SessionProvider';
import { Button, Space, Text } from 'components';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { SVG } from '../assets';
import { LoginLayoutWithSignUp } from '../Layout/LoginLayoutWithSignUp/LoginLayoutWithSignUp';
import { useLoginContext } from '../Login.context';
import { LoginService } from '../Login2.service';
import { calculateInputLoginType } from '../utils/auth.utils';
import { LoginValidator, Type } from '../validator/email.validator';
import { useLoginSignInStyles } from './LoginSignIn.styles';

export const LoginSignIn: React.VFC = () => {
  const styles = useLoginSignInStyles();

  const login = useLoginContext();
  const session = useSession();

  const [passwordFocus, isPasswordFocus] = useState(false);
  const [idNumberVisible, setIdNumberVisible] = useState(false);

  const [emailPhone, setEmailPhone] = useState<string>('');
  const [emailPhoneError, setEmailPhoneError] = useState(false);

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [logging, setLogging] = useState(false);

  const PassSVG = idNumberVisible ? SVG.VisibleOff : SVG.VisibleOn;

  const logIn = async () => {
    let validInputs = true;
    setEmailPhoneError(false);
    setPasswordError(false);
    setLoginError(false);
    setLogging(true);
    const contact = LoginValidator.validateContact(emailPhone);
    if (!contact.valid) {
      setEmailPhoneError(true);
      setLogging(false);
      validInputs = false;
    }
    if (!password || password.length < 8 || password.length > 16) {
      setPasswordError(true);
      setLogging(false);
      validInputs = false;
    }
    if (!validInputs) {
      return;
    }
    const sessionData = await LoginService.login({
      [calculateInputLoginType(contact.type as Type)]: emailPhone,
      password: password,
      first_name: '',
      last_name: '',
    }).catch((err) => {
      setLoginError(err);
      return null;
    });
    setLogging(false);
    if (sessionData) {
      session.login(sessionData);
    }
  };

  return (
    <LoginLayoutWithSignUp>
      <View>
        <AnimatedTextInput
          value={emailPhone}
          placeholder={'Email or phone number'}
          onChangeText={(text) => {
            setEmailPhone(text);
            setEmailPhoneError(false);
          }}
          editable={!logging}
          autoCapitalize='none'
          error={emailPhoneError}
          onFocus={() => setEmailPhoneError(false)}
          onBlur={() => {
            if (!emailPhone || emailPhone.length === 0) {
              setEmailPhoneError(true);
            }
          }}
          focusStyle={styles.credentialInputFocus}
          style={styles.credentialInput}
        />
        {emailPhoneError && (
          <View style={styles.inputErrorContainer}>
            <SVG.Alert width={15} height={15} fill={styles.inputErrorSVG.color} />
            <Space horizontal margin={2} />
            <Text size={12} style={styles.inputErrorText}>
              Invalid email/phone
            </Text>
          </View>
        )}

        <Space margin={5} />
        <View style={styles.passwordInputContainer}>
          <AnimatedTextInput
            value={password}
            onChangeText={(p) => {
              setPassword(p);
              setPasswordError(false);
            }}
            editable={!logging}
            error={passwordError}
            secureTextEntry={!idNumberVisible}
            autoCompleteType='password'
            onFocus={() => isPasswordFocus(true)}
            onBlur={() => isPasswordFocus(false)}
            focusStyle={styles.credentialInputFocus}
            style={styles.credentialInput}
            placeholder='Password'
            // keyboardType={'number-pad'}
            maxLength={16}
          />
          <Pressable style={styles.passVisible} onPress={() => setIdNumberVisible((visible) => !visible)}>
            <PassSVG fill={passwordFocus ? styles.visibleFocus.color : styles.visible.color} />
          </Pressable>
        </View>
        <View style={styles.passwordBottom}>
          {passwordError && (
            <View style={styles.inputErrorContainer}>
              <SVG.Alert width={15} height={15} fill={styles.inputErrorSVG.color} />
              <Space horizontal margin={2} />
              <Text size={12} style={styles.inputErrorText}>
                Invalid password
              </Text>
            </View>
          )}
          <Pressable onPress={() => login.goTo('ForgotPass')} style={styles.forgotPassword}>
            <Text bold style={styles.forgotPasswordText}>
              Forgot password
            </Text>
          </Pressable>
        </View>
      </View>

      {loginError && (
        <View style={styles.inputErrorContainer}>
          <SVG.Alert width={15} height={15} fill={styles.inputErrorSVG.color} />
          <Space horizontal margin={2} />
          <Text size={12} style={styles.inputErrorText}>
            Invalid email/phone or password
          </Text>
        </View>
      )}

      <Space margin={13} />

      <Button
        noShadow
        loading={logging}
        style={styles.logInButton}
        disabled={
          emailPhoneError || passwordError || !emailPhone || emailPhone.length < 1 || !password || password.length < 1
        }
        onPress={() => logIn()}>
        Log in
      </Button>

      <Space margin={8} />
    </LoginLayoutWithSignUp>
  );
};
