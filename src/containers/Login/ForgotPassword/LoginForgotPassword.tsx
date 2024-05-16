import { Button, Space, Text } from 'components';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import { ValidationCodeModal } from 'components/ValidationCodeModal/ValidationCodeModal';
import { validateResponse } from 'model/backend';
import { useCodeValidator } from 'providers/hooks/code-validator.hook';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SVG } from '../assets';
import { LoginLayoutWithSignUp } from '../Layout/LoginLayoutWithSignUp/LoginLayoutWithSignUp';
import { useLoginContext } from '../Login.context';
import { calculateInputLoginType } from '../utils/auth.utils';
import { LoginValidator, Type } from '../validator/email.validator';
import { useLoginForgotPasswordStyles } from './LoginForgotPassword.styles';
// import { BackendClient } from 'core/service/backend-client';

export const LoginForgotPassword: React.VFC = () => {
  const styles = useLoginForgotPasswordStyles();
  const login = useLoginContext();
  const { post, onClose, showValidationModal, msg } = useCodeValidator();

  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState<Type>();

  const sendResetPassword = (isResend?: boolean) => {
    const validContact = LoginValidator.validateContact(email);
    if (!validContact.valid) {
      setEmailError(true);
      return;
    }
    setLoading(true);
    setContact(validContact.type);
    // display check your inbox modal
    return post(
      '/forgot_password',
      {
        [calculateInputLoginType(validContact.type as Type)]: email,
      },
      undefined,
      isResend
    )
      .then(validateResponse)
      .finally(() => {
        setLoading(false);
      });
  };

  const validateCode = async (code: string) => {
    if (!code || code.length !== 4) {
      return;
    }
    const data = await post(
      '/forgot_password',
      {
        [calculateInputLoginType(contact as Type)]: email,
      },
      code
    );
    // console.log(data);
    if (data) {
      // send to enter the new user's password page
      login.setTokenRecover(data.access_token);
      login.goTo('ResetPass');
    }
  };

  return (
    <>
      <ValidationCodeModal
        onClose={onClose}
        modalVisible={showValidationModal}
        contact={contact as Type}
        validateCode={validateCode}
        contactValue={email as string}
        messages={msg}
        sendCodeAgain={() => sendResetPassword(true)}
      />
      <LoginLayoutWithSignUp back>
        <Text>Enter you email address or phone number to reset password</Text>
        <Space margin={13} />
        <Text bold>Enter your email or phone number</Text>
        <AnimatedTextInput
          autoFocus
          value={email}
          onChangeText={(e) => {
            setEmail(e);
            setEmailError(false);
          }}
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
            <Text size={12} style={styles.inputErrorSVG}>
              Email or phone number invalid
            </Text>
          </View>
        )}

        <Space margin={10} />

        <Button
          noShadow
          loading={loading}
          style={styles.sendButton}
          disabled={emailError || !LoginValidator.validateContact(email).valid}
          onPress={() => sendResetPassword()}>
          Send password instructions
        </Button>

        <Space margin={10} />
      </LoginLayoutWithSignUp>
    </>
  );
};
