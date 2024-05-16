import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useReachOutTrustedPeopleAddStyles } from './ReachOutTrustedPeopleAdd.styles';
import { Button, Card, Text, TextInput } from 'components';
import { SVG } from './assets';
import { useNavigation } from '@react-navigation/native';
import { Space } from 'components/Space/Space';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import examples from 'libphonenumber-js/examples.mobile.json';
import { getExampleNumber, isValidPhoneNumber } from 'libphonenumber-js';
import * as EmailValidator from 'email-validator';
import { BackendClient } from 'service/backend-client.service';
import { TrustedPerson, TrustedPersonCreate, TrustedPersonRes } from 'model/backend/trusted-people';
import { validateResponse } from 'model/backend';
import { ReachOutTrustedPeopleRoutes } from 'containers/Main/ReachOut/TrustedPeople/ReachOutTrustedPeople.routes';
import { ModalWrapper } from 'components/Modal/Modal';
import { showAlertIfNetworkError } from 'providers/error.alert';

const PHONE_NUMBER_EXAMPLE = getExampleNumber('US', examples);
const PLACEHOLDER = PHONE_NUMBER_EXAMPLE?.formatNational().replace('(', '').replace(')', '').replace(' ', '-');

export const ReachOutTrustedPeopleAdd: React.VFC = () => {
  const styles = useReachOutTrustedPeopleAddStyles();
  const navigation = useNavigation();

  const [creating, setCreating] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  const [name, setName] = useState<string>();

  const [phoneError, setPhoneError] = useState(false);
  const [phone, setPhone] = useState<string>();

  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState(false);

  const validate = () => {
    let emailValid = true;
    if (email && email.length > 0) {
      emailValid = EmailValidator.validate(email);
      setEmailError(!emailValid);
    }
    let phoneValid = true;
    if (!phone) {
      setPhoneError(true);
      phoneValid = false;
    } else {
      phoneValid = isValidPhoneNumber(phone, 'US');
      setPhoneError(!phoneValid);
    }
    return emailValid && phoneValid;
  };

  const create = () => {
    if (!validate()) {
      return;
    }
    const data: TrustedPersonCreate = {
      cell_phone: phone || '',
      email: email,
      first_name: name,
    };
    setCreating(true);
    BackendClient.post<TrustedPersonRes>('/trusted_person/create', data)
      .then(validateResponse)
      .then((res) => {
        setCreated(res.trusted_person);
        setShowDone(true);
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot create trusted person', err);
      })
      .finally(() => setCreating(false));
  };

  const [showDone, setShowDone] = useState(false);
  const [created, setCreated] = useState<TrustedPerson>();

  const closeDone = () => {
    setCreated(undefined);
    setShowDone(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Modal
        animationType='slide'
        visible={showDone}
        transparent={true}
        onRequestClose={() => {
          closeDone();
        }}>
        <ModalWrapper onClose={() => closeDone()} backgroundViewStyles={{ middle: styles.middle }}>
          <View style={{ padding: 10, marginTop: 30 }}>
            <View style={styles.nameInfo}>
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={require('./assets/avatar.default.png')} />
              </View>
              <Space horizontal margin={5} />
              <Text bold>
                {created?.first_name} {created?.last_name}
              </Text>
            </View>
            <Space margin={10} />
            <Text bold>Phone 1</Text>
            <Text>{created?.cell_phone}</Text>
            <Space margin={10} />
            <Text bold>Email</Text>
            <Text>{created?.email}</Text>
            <Space margin={10} />
            <View style={styles.doneButton}>
              <Button onPress={() => navigation.navigate(ReachOutTrustedPeopleRoutes.MAIN)}>DONE</Button>
            </View>
          </View>
        </ModalWrapper>
      </Modal>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.root}>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={10}>
            <View style={styles.closeContainer}>
              <Pressable onPress={() => navigation.goBack()}>
                <SVG.Close width={45} height={45} fill={styles.closeButton.color} />
              </Pressable>
            </View>
            <Space margin={10} />
            <Card>
              <Text center lineHeight={22} size={14}>
                Add the contact information for someone you can reach out when you need support. Remember, you can have
                up to 7 Trusted People
              </Text>
            </Card>
            <Space margin={15} />

            <Card>
              <Space margin={5} />
              <Text bold>Name</Text>
              <Space margin={2} />
              <TextInput onChangeText={(text) => setName(text)} placeholder='John Smith' />
              <Space />
              <Text bold>Phone No.</Text>
              <Space margin={2} />
              <AnimatedTextInput
                error={phoneError}
                onChangeText={(text) => {
                  setPhone(text);
                  setCanCreate(!!text);
                  setPhoneError(false);
                }}
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
                placeholder={PLACEHOLDER}
              />

              <Space />
              <Text bold>Email (optional)</Text>
              <Space margin={2} />
              <AnimatedTextInput
                error={emailError}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError(false);
                }}
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholder='john.smith@example.com'
              />
            </Card>
            <Space margin={10} />
            <View style={styles.buttonContainer}>
              <Button horizontalButtonPadding={100} disabled={!canCreate} loading={creating} onPress={() => create()}>
                DONE
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
