import { View } from 'react-native';
import React, { useState } from 'react';
import { useReachOutCopingCoachModalFormStyles } from './ReachOutCopingCoachModalForm.styles';
import { Button, Checkbox, Text } from 'components';
import { Space } from 'components/Space/Space';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import { isValidPhoneNumber } from 'libphonenumber-js';
import * as EmailValidator from 'email-validator';

export interface ReachOutFormData {
  phone?: string;
  email?: string;
}

interface ReachOutCopingCoachModalFormProps {
  onNext: (formData: ReachOutFormData) => void;
  onCancel: () => void;
  title?: JSX.Element | string;
  type?: JSX.Element | string;
  loading?: boolean;
}

export const ReachOutCopingCoachModalForm: React.VFC<ReachOutCopingCoachModalFormProps> = (props) => {
  const styles = useReachOutCopingCoachModalFormStyles();

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkVoice, setCheckVoice] = useState(false);
  const [checkError, setCheckError] = useState(false);

  const [phone, setPhone] = useState<string>();
  const [phoneError, setPhoneError] = useState(false);

  const [emailOne, setEmailOne] = useState<string>();
  const [emailOneError, setEmailOneError] = useState(false);

  const [emailTwo, setEmailTwo] = useState<string>();
  const [emailTwoError, setEmailTwoError] = useState(false);

  const next = () => {
    if (!checkEmail && !checkVoice) {
      setCheckError(true);
      return;
    }
    if (checkVoice) {
      if (!phone) {
        setPhoneError(true);
        return;
      }
      const validPhone = isValidPhoneNumber(phone, 'US');
      if (!validPhone) {
        setPhoneError(true);
        return;
      }
    }
    if (checkEmail) {
      if (!emailOne) {
        setEmailOneError(true);
        return;
      }
      const validEmailOne = EmailValidator.validate(emailOne);
      if (!validEmailOne) {
        setEmailOneError(true);
        return;
      }
      if (!emailTwo) {
        setEmailTwoError(true);
        return;
      }
      if (emailTwo.toLowerCase() !== emailOne.toLowerCase()) {
        setEmailTwoError(true);
        return;
      }
    }
    props.onNext({ phone: phone, email: emailOne });
  };

  return (
    <>
      <Space />
      <Text size={15} bold center>
        {props.title || 'Schedule Coach'}
      </Text>
      <Space margin={10} />
      <Text size={15} lineHeight={24}>
        How can the {props.type || 'coach'} reach out to you?
      </Text>
      <Text>You can enter multiple contact {props.title ? 'options' : 'methods'}.</Text>
      <Space margin={10} />
      <Text bold size={15}>
        Contact me by:
      </Text>
      <Space />
      <View style={styles.checkboxes}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            square
            isChecked={checkEmail}
            iconStyle={[checkError && styles.checkboxError]}
            onPress={(value) => {
              setCheckError(false);
              setCheckEmail(!!value);
            }}
          />
          <Text size={15} bold>
            Email
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            square
            isChecked={checkVoice}
            // bounceFriction={100000}
            // size={35}
            iconStyle={[checkError && styles.checkboxError]}
            onPress={(value) => {
              setCheckVoice(!!value);
              setCheckError(false);
            }}
          />
          <Text size={15} bold>
            Voice
          </Text>
        </View>
      </View>
      <Space margin={10} />
      <Text size={15} bold>
        Contact me by phone
      </Text>
      <Space />
      <Text size={15}>Enter phone number</Text>
      <AnimatedTextInput
        value={phone}
        error={phoneError}
        onChangeText={(text) => {
          setPhone(text);
          setPhoneError(false);
        }}
        keyboardType='phone-pad'
        textContentType='telephoneNumber'
        placeholder={'XXX-XXX-XXXX'}
      />
      <Space margin={10} />
      <Text size={15} bold>
        Contact me by email
      </Text>
      <Space />
      <Text size={15}>Enter email address</Text>
      <AnimatedTextInput
        value={emailOne}
        error={emailOneError}
        onChangeText={(text) => {
          setEmailOne(text);
          setEmailOneError(false);
        }}
        keyboardType='email-address'
        textContentType='emailAddress'
      />
      <Text size={15}>Confirm email address</Text>
      <AnimatedTextInput
        value={emailTwo}
        error={emailTwoError}
        onChangeText={(text) => {
          setEmailTwo(text);
          setEmailTwoError(false);
        }}
        keyboardType='email-address'
        textContentType='emailAddress'
      />
      <Space margin={10} />
      <View style={styles.buttonsContainer}>
        <Button style={styles.cancelButton} textStyle={styles.cancelButtonText} onPress={() => props.onCancel()}>
          CANCEL
        </Button>
        <Button loading={props.loading} style={styles.nextButton} onPress={() => next()}>
          NEXT
        </Button>
      </View>
    </>
  );
};
