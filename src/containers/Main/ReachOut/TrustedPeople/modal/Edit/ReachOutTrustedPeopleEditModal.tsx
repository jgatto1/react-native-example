import { Modal, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useReachOutTrustedPeopleEditModalStyles } from './ReachOutTrustedPeopleEditModal.styles';
import { Button, Modal as ModalWrapper, Text } from 'components';
import { Space } from 'components/Space/Space';
import { SVG } from '../../assets';
import * as EmailValidator from 'email-validator';
import { TrustedPerson, TrustedPersonCreate, TrustedPersonRes } from 'model/backend/trusted-people';
import { BackendClient } from 'service/backend-client.service';
import { validateResponse } from 'model/backend';
import { DefaultAvatar } from 'components/Avatar/Avatar';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import { isValidPhoneNumber } from 'libphonenumber-js';

interface Props {
  selected: TrustedPerson | undefined;
  onClose: () => void;
  onAction: (action: 'EDIT' | 'DELETE', person: TrustedPerson) => void;
}

export const ReachOutTrustedPeopleEditModal: React.VFC<Props> = ({ selected, onClose, onAction }) => {
  const styles = useReachOutTrustedPeopleEditModalStyles();

  const visible = !!selected && !!selected.uuid;

  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [phone, setPhone] = useState(selected?.cell_phone);
  const [phoneError, setPhoneError] = useState(false);

  const [email, setEmail] = useState(selected?.email);
  const [emailError, setEmailError] = useState(false);

  const [modalState, setModalState] = useState<'INITIAL' | 'DELETE' | 'EDIT'>('INITIAL');

  useEffect(() => {
    setPhone(selected?.cell_phone);
    setEmail(selected?.email);
  }, [selected]);

  const close = () => {
    setEditDoneTrustedPerson(undefined);
    setModalState('INITIAL');
    onClose();
  };

  const deletePerson = () => {
    if (!selected) {
      return;
    }
    setDeleting(true);
    BackendClient.delete<TrustedPersonRes>(`/trusted_person/${selected.uuid}/delete`)
      .then(validateResponse)
      .then(() => onAction('DELETE', selected))
      .catch((err) => {
        console.warn(`Cannot delete trusted person ${selected.uuid}`, err);
      })
      .finally(() => {
        setDeleting(false);
        close();
      });
  };

  const editPerson = () => {
    if (!selected || !phone) {
      return;
    }
    const validPhone = isValidPhoneNumber(phone, 'US');
    setPhoneError(!validPhone);
    const validEmail = !!email && email.length > 0 ? EmailValidator.validate(email) : true;
    setEmailError(!validEmail);
    if (!validPhone || !validEmail) {
      return;
    }
    setUpdating(true);
    const data: TrustedPersonCreate = { cell_phone: phone, email: email };
    BackendClient.put<TrustedPersonRes>(`/trusted_person/${selected.uuid}`, data)
      .then(validateResponse)
      .then((res) => setEditDoneTrustedPerson(res.trusted_person))
      .catch((err) => {
        console.warn(`Cannot update trusted person ${selected.uuid}`, err);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const [editDoneTrustedPerson, setEditDoneTrustedPerson] = useState<TrustedPerson>();

  return (
    <Modal visible={visible} animationType='slide' transparent={false}>
      <ModalWrapper
        styles={{ root: [styles.modalRoot, !!editDoneTrustedPerson && styles.modalRootEditDone] }}
        backgroundViewStyles={{ top: styles.modalTop, middle: styles.modalMiddle }}
        onClose={() => close()}>
        <View style={styles.root}>
          {modalState === 'INITIAL' && (
            <>
              <Space margin={10} />
              <Text bold center>
                Trusted People
              </Text>
              <Space />
              <Text bold center>
                {selected?.first_name}
              </Text>
              <Space margin={10} />
              <View style={styles.modalEditButtonsContainer}>
                <Button
                  style={styles.modalButton}
                  onPress={() => setModalState('EDIT')}
                  icon={
                    <SVG.Edit
                      style={styles.modalButtonIcon}
                      width={30}
                      height={30}
                      fill={styles.modalButtonIcon.color}
                    />
                  }>
                  EDIT THIS CONTACT
                </Button>
                <Space margin={10} />
                <Button
                  style={styles.modalButton}
                  onPress={() => setModalState('DELETE')}
                  icon={
                    <SVG.Remove
                      style={styles.modalButtonIcon}
                      width={30}
                      height={30}
                      fill={styles.modalButtonIcon.color}
                    />
                  }>
                  DELETE THIS CONTACT
                </Button>
                <Space />
              </View>
            </>
          )}
          {modalState === 'DELETE' && (
            <>
              <Space margin={10} />
              <Text bold center>
                Trusted People
              </Text>
              <Space margin={15} />
              <Text>
                Are you sure you want to <Text bold>delete</Text> the contact?
              </Text>
              <Space margin={15} />
              <View style={styles.deleteButtonContainer}>
                <Button style={styles.cancelButton} textStyle={styles.cancelButtonText} onPress={() => close()}>
                  NO
                </Button>
                <Button loading={deleting} onPress={() => deletePerson()}>
                  YES
                </Button>
              </View>
            </>
          )}
          {modalState === 'EDIT' && (
            <>
              {editDoneTrustedPerson && (
                <>
                  <Text>
                    <Text bold>{editDoneTrustedPerson.first_name}</Text>'s information has been updated!
                  </Text>
                  <Space margin={15} />
                  <View style={styles.editDone}>
                    <Button
                      onPress={() => {
                        onAction('EDIT', editDoneTrustedPerson);
                        close();
                      }}>
                      OK
                    </Button>
                  </View>
                  <Space />
                </>
              )}
              {!editDoneTrustedPerson && (
                <>
                  <View style={styles.editProfileInfo}>
                    <DefaultAvatar size={50} />
                    <Space horizontal margin={10} />
                    <Text bold>{selected?.first_name}</Text>
                  </View>

                  <Space />
                  <Text bold>Phone 1</Text>
                  <Space margin={2} />
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

                  <Space />
                  <Text bold>Email</Text>
                  <Space margin={2} />
                  <AnimatedTextInput
                    value={email}
                    error={emailError}
                    onChangeText={(text) => {
                      setEmail(text);
                      setEmailError(false);
                    }}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    placeholder='john.smith@example.com'
                  />
                  <Space />

                  <View style={styles.doneButtonContainer}>
                    <Button loading={updating} onPress={() => editPerson()}>
                      DONE
                    </Button>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </ModalWrapper>
    </Modal>
  );
};
