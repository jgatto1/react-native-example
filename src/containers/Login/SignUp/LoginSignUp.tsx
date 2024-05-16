// import { LoginService } from 'ui/views/Auth/Login/service';
import { useSession } from '@providers/session/SessionProvider';
import { Button, Space, Text } from 'components';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import { ValidationCodeModal } from 'components/ValidationCodeModal/ValidationCodeModal';
import { useCodeValidator } from 'providers/hooks/code-validator.hook';
import React, { useEffect, useState } from 'react';
import { BackHandler, Pressable, View } from 'react-native';
import { SVG } from '../assets';
import { LoginLayout } from '../Layout/LoginLayout';
import { useLoginContext } from '../Login.context';
import { calculateInputLoginType, generateSessionData } from '../utils/auth.utils';
import { ContactValidResult, LoginValidator, Type } from '../validator/email.validator';
import { useLoginSignUpStyles } from './LoginSignUp.styles';

export const LoginSignUp: React.VFC = () => {
  const styles = useLoginSignUpStyles();
  const { post, onClose, showValidationModal, msg } = useCodeValidator();
  const login = useLoginContext();
  const session = useSession();
  const [contact, setContact] = useState<ContactValidResult>();
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState(false);
  const [pwd, setPwd] = useState<string>();
  const [pwdShow, setPwdShow] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const validPwd = !!pwd && pwd.length > 7 && pwd.length < 17;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      login.goTo('SignIn');
      return true;
    });

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PassSVG = pwdShow ? SVG.VisibleOff : SVG.VisibleOn;

  const passIcon =
    !pwd || pwd.length === 0 ? (
      <Text size={5}> ⬤{'  '}</Text>
    ) : pwd?.length > 7 && pwd?.length < 17 ? (
      <SVG.Done fill={styles.doneSVG.color} width={18} height={18} />
    ) : (
      <SVG.Alert fill={styles.alertSVG.color} width={18} height={18} />
    );

  const passHintTextStyle =
    !pwd || pwd.length === 0
      ? false
      : pwd?.length > 7 && pwd?.length < 17
      ? styles.passHintTextOk
      : styles.passHintTextAlert;

  const signUp = (isResend?: boolean) => {
    const contact = LoginValidator.validateContact(email);
    if (!contact.valid) {
      setEmailError(true);
      return;
    }
    if (!pwd || pwd.length < 8 || pwd.length > 16) {
      setPwdError(true);
      return;
    }
    setLoading(true);
    setContact(contact);
    post(
      '/signup',
      {
        [calculateInputLoginType(contact.type as Type)]: email,
        password: pwd,
        first_name: '',
        last_name: '',
      },
      undefined,
      isResend
    )
      .catch((err) => console.warn('Cannot sign up', err))
      .finally(() => setLoading(false));
  };

  const validateSignupCode = async (code: string) => {
    if (!code || code.length !== 4) {
      return;
    }
    const data = await post(
      '/signup',
      {
        [calculateInputLoginType(contact?.type as Type)]: email,
        password: pwd,
        first_name: '',
        last_name: '',
      },
      code
    );
    if (data) {
      const sessionData = generateSessionData(data);
      session.login(sessionData);
    }
  };

  return (
    <>
      <ValidationCodeModal
        onClose={onClose}
        modalVisible={showValidationModal}
        contact={contact?.type as Type}
        validateCode={validateSignupCode}
        contactValue={email as string}
        messages={msg}
        sendCodeAgain={() => signUp(true)}
      />
      <LoginLayout back>
        <AnimatedTextInput
          value={email}
          onChangeText={(e) => {
            setEmail(e);
            setEmailError(false);
          }}
          autoCapitalize='none'
          onBlur={() => {
            if (!!email && email.length > 0) {
              setEmailError(!LoginValidator.validateContact(email).valid);
            }
          }}
          editable={!loading}
          error={emailError}
          focusStyle={styles.credentialInputFocus}
          style={styles.credentialInput}
          placeholder='Email or phone number'
        />
        {emailError && (
          <View style={styles.inputErrorContainer}>
            <SVG.Alert width={15} height={15} fill={styles.inputErrorSVG.color} />
            <Space horizontal margin={2} />
            <Text size={12} style={styles.inputErrorText}>
              Invalid email or phone
            </Text>
          </View>
        )}

        <Space margin={5} />
        <View style={styles.passwordInputContainer}>
          <AnimatedTextInput
            value={pwd}
            onChangeText={(p) => {
              setPwd(p);
              setPwdError(false);
            }}
            editable={!loading}
            error={pwdError}
            secureTextEntry={!pwdShow}
            autoCompleteType='password'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            focusStyle={styles.credentialInputFocus}
            style={styles.credentialInput}
            placeholder='Password'
            maxLength={30}
          />
          <Pressable style={styles.passVisible} onPress={() => setPwdShow((show) => !show)}>
            <PassSVG fill={pwdFocus ? styles.visibleFocus.color : styles.visible.color} />
          </Pressable>
          <Text>Your password must be:</Text>
          <Space margin={3} />
          <View style={styles.pwdHintContainer}>
            {passIcon}
            <Text style={passHintTextStyle}> Any from 8 to 16 characters</Text>
          </View>
        </View>

        <Space margin={40} />
        <View style={styles.signUpContainer}>
          <Button
            noShadow
            loading={loading}
            style={styles.signUpButton}
            disabled={emailError || !LoginValidator.validateContact(email).valid || !validPwd}
            onPress={() => signUp()}>
            Sign up
          </Button>

          <Space margin={8} />

          <View style={styles.signInContainer}>
            <Text center>Already have an account?{'   '}</Text>
            <Pressable onPress={() => login.goTo('SignIn')}>
              <Text bold style={styles.signIn}>
                Log in
              </Text>
            </Pressable>
          </View>
        </View>
        {/* this will add a space preventing the bottom links from being moved up (this is a hack, they are moved but not visible)
          the other way due to flex sizes the bottom links were moved */}
        <View style={{ height: 200 }} />
      </LoginLayout>
    </>
  );
};
