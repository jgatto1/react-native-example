import { Button, Space, Text } from 'components';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import { validateResponse } from 'model/backend';
import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { BackendClient, BASE_URL_V2 } from 'service/backend-client.service';
import { SVG } from '../assets';
import { LoginLayout } from '../Layout/LoginLayout';
import { useLoginContext } from '../Login.context';
import { useLoginResetPasswordStyles } from './LoginResetPassword.styles';

export const LoginResetPassword: React.VFC = () => {
  const styles = useLoginResetPasswordStyles();

  const login = useLoginContext();

  const [password, setPassword] = useState<string>();
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [show, setShow] = useState(false);

  const [confirmPass, setConfirmPass] = useState<string>();
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [confirmPassFocus, setConfirmPassFocus] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const PassSVG = show ? SVG.VisibleOff : SVG.VisibleOn;
  const ConfirmPassSVG = confirmShow ? SVG.VisibleOff : SVG.VisibleOn;

  const passHintTextStyle =
    !password || password.length === 0
      ? false
      : password?.length > 7 && password?.length < 17
      ? styles.passHintTextOk
      : styles.passHintTextAlert;

  const passHintIcon =
    !password || password.length === 0 ? (
      <Text size={5}> ⬤{'  '}</Text>
    ) : password?.length > 7 && password?.length < 17 ? (
      <SVG.Done fill={styles.doneSVG.color} width={18} height={18} />
    ) : (
      <SVG.Alert fill={styles.alertSVG.color} width={18} height={18} />
    );

  const passwordOk = !!password && password.length > 7 && password?.length < 17;

  const canReset = passwordOk && password === confirmPass;

  const confirmPassHintTextStyle =
    !confirmPass || confirmPass.length === 0 ? false : canReset ? styles.passHintTextOk : styles.passHintTextAlert;

  const confirmPassHintIcon =
    !confirmPass || confirmPass.length === 0 ? (
      <Text size={5}> ⬤{'  '}</Text>
    ) : canReset ? (
      <SVG.Done fill={styles.doneSVG.color} width={18} height={18} />
    ) : (
      <SVG.Alert fill={styles.alertSVG.color} width={18} height={18} />
    );

  const [showModal, setShowModal] = useState(false);

  const resetPassword = () => {
    if (!canReset) {
      return;
    }
    setLoading(true);
    BackendClient.post(
      '/change_password',
      { password: confirmPass },
      {
        baseURL: BASE_URL_V2,
        headers: { ...(login.tokenRecover && { Authorization: `Bearer ${login.tokenRecover}` }) },
      }
    )
      .then(validateResponse)
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => {
        console.warn('Cannot reset pass', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal visible={showModal} animated={true} transparent={true} animationType='fade'>
        <View style={styles.modalScreen}>
          <View style={styles.modal}>
            <Space />
            <Pressable onPress={() => setShowModal(false)} style={styles.modalCloseContainer}>
              <SVG.Close fill={styles.modalCloseSVG.color} width={20} height={20} />
            </Pressable>
            <View style={styles.modalContent}>
              <Text bold size={22} center>
                Success
              </Text>
              <Space margin={10} />
              <Text center>Your password has been changed</Text>
              <Space margin={18} />
              <Button noShadow style={styles.resetPassButton} onPress={() => login.goTo('SignIn')}>
                Log in
              </Button>
              <Space margin={10} />
            </View>
          </View>
        </View>
      </Modal>
      <LoginLayout back>
        <Text bold>Enter a new password</Text>
        <View style={styles.passwordInputContainer}>
          <AnimatedTextInput
            value={password}
            onChangeText={(p) => {
              setPassword(p);
            }}
            editable={!loading}
            secureTextEntry={!show}
            autoCompleteType='password'
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            focusStyle={styles.credentialInputFocus}
            style={styles.credentialInput}
            placeholder='Password'
            maxLength={30}
          />
          <Pressable style={styles.passVisible} onPress={() => setShow((visible) => !visible)}>
            <PassSVG fill={passwordFocus ? styles.visibleFocus.color : styles.visible.color} />
          </Pressable>
          <Text>Your password must be:</Text>
          <View style={styles.pwdHintContainer}>
            {passHintIcon}
            <Text style={passHintTextStyle}> Any from 8 to 16 characters</Text>
          </View>
        </View>

        <Space margin={8} />

        <Text bold>Confirm password</Text>
        <View style={styles.passwordInputContainer}>
          <AnimatedTextInput
            value={confirmPass}
            onChangeText={(p) => {
              setConfirmPass(p);
              setConfirmPassError(false);
            }}
            editable={!loading && passwordOk}
            secureTextEntry={!confirmShow}
            autoCompleteType='password'
            onFocus={() => setConfirmPassFocus(true)}
            onBlur={() => setConfirmPassFocus(false)}
            focusStyle={styles.credentialInputFocus}
            style={styles.credentialInput}
            placeholder='Password'
            maxLength={30}
          />
          <Pressable style={styles.passVisible} onPress={() => setConfirmShow((visible) => !visible)}>
            <ConfirmPassSVG fill={confirmPassFocus ? styles.visibleFocus.color : styles.visible.color} />
          </Pressable>
          <View style={styles.pwdHintContainer}>
            {confirmPassHintIcon}
            <Text style={confirmPassHintTextStyle}>
              {canReset ? 'Passwords are the same' : 'Passwords are not the same'}{' '}
            </Text>
          </View>
          {confirmPassError && (
            <View style={styles.inputErrorContainer}>
              <SVG.Alert width={15} height={15} fill={styles.inputError.color} />
              <Space horizontal margin={2} />
              <Text size={12} style={styles.inputError}>
                Password are not the same
              </Text>
            </View>
          )}

          <Space margin={10} />

          <Button
            noShadow
            loading={loading}
            style={styles.resetPassButton}
            disabled={!canReset}
            onPress={() => resetPassword()}>
            Reset password
          </Button>
        </View>
      </LoginLayout>
    </>
  );
};
