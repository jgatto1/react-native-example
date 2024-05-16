import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { useModalStyles } from './style';
import { SVG } from './assets';
import { BackgroundViewProperties } from 'components/BackgroundView/BackgroundView';
import { Space } from 'components/Space/Space';
import { Text } from 'components/Text/Text';
import { CodeField, Cursor, useBlurOnFulfill } from 'react-native-confirmation-code-field';
import { Button } from 'components/Button/Button';
import { Type } from 'containers/Login/validator/email.validator';

interface ModalRouteProp {
  closeRoute?: string;
}

interface ModalProps {
  onClose: () => void;
  withoutTabBar?: boolean;
  rootStyle?: StyleProp<ViewStyle>;
  contact: Type;
  modalVisible: boolean;
  validateCode: (code: string) => any;
  sendCodeAgain?: () => any;
  contactValue: string;
  messages?: string;
}

export const ValidationCodeModal: React.FC<ModalProps & BackgroundViewProperties> = (props) => {
  const styles = useModalStyles();
  // const [sendingAgain, setSendingAgain] = useState(false);
  const [validating, setValidating] = useState(false);
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: 4 });

  useEffect(() => {
    if (!props.modalVisible) {
      setCode('');
    }
  }, [props.modalVisible]);

  const validateCode = async () => {
    try {
      setValidating(true);
      await props.validateCode(code);
      setValidating(false);
    } catch (error) {
      setValidating(false);
      setCode('');
      console.error('error validating code', code, error);
    }
  };

  return (
    <Modal visible={props.modalVisible} animated={true} transparent={true} animationType='fade'>
      <View style={styles.modalScreen}>
        <View style={styles.modal}>
          <View style={styles.btnContainer}>
            <Pressable onPress={() => props.onClose()} style={styles.closeBtn}>
              <SVG.Close2 width={20} height={20} />
            </Pressable>
          </View>
          <Space />
          <View style={styles.modalContent}>
            <Text bold size={22} center>
              Check your inbox
            </Text>
            <Space margin={10} />
            <Text center>
              {props.contact === 'EMAIL' ? 'We sent a verification email to' : 'We sent a verification code to'}
            </Text>
            <Text center bold>
              {props.contactValue}
            </Text>
            <Space margin={10} />
            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={4}
              rootStyle={styles.codeField}
              keyboardType='number-pad'
              textContentType='oneTimeCode'
              renderCell={({ index, symbol, isFocused }) => (
                <React.Fragment key={index}>
                  <Text key={`value-${index}`} style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </React.Fragment>
              )}
            />
            <Space margin={5} />
            {!!props.messages && <Text style={styles.invalidCode}>{props.messages}</Text>}
            <Space margin={10} />
            <Button
              // loading={validating || sendingAgain}
              loading={validating}
              noShadow
              style={styles.validCode}
              onPress={() => validateCode()}>
              Get started now
            </Button>
            <Space />
            <View style={styles.resendCodeContainer}>
              <Text>Didn't receive a{props.contact === 'PHONE' ? ' code' : 'n email'}? </Text>
              <Pressable onPress={() => props.sendCodeAgain && props.sendCodeAgain()}>
                <Text bold style={styles.resend}>
                  Resend {props.contact === 'PHONE' ? 'SMS' : 'email'}
                </Text>
              </Pressable>
            </View>
            <Space margin={10} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ModalWrapper = ValidationCodeModal;
