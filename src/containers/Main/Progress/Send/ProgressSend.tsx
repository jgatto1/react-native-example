import { KeyboardAvoidingView, Modal, Pressable, ScrollView, View } from 'react-native';
import React, { createRef, useState } from 'react';
import { useProgressSendStyles } from './ProgressSend.styles';
import { Button, Card, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import * as EmailValidator from 'email-validator';
import { FUser, Res, validateResponse } from 'model/backend';
import { SVG } from './assets';
import { Picker, PickerRef } from 'components/Picker/Picker';
import { ModalWrapper } from 'components/Modal/Modal';
import { useSession } from 'providers/session/SessionProvider';
import { useFocusEffect } from '@react-navigation/native';
import { BackendClient } from 'service/backend-client.service';
import { ProgressRecipientsRes } from 'model/backend/progress';
import { UserSettings } from 'model/backend/user.settings';
import { showAlertIfNetworkError } from 'providers/error.alert';

export const ProgressSend: React.VFC = () => {
  const styles = useProgressSendStyles();
  const session = useSession();

  const [email, setEmail] = useState<string>();
  const [sending, setSending] = useState<boolean>(false);

  const [emailTmp, setEmailTmp] = useState<string>();
  const [actualEmails, setActualEmails] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);

  const schedulePickerRef = createRef<PickerRef>();
  const [scheduleDays, setScheduleDays] = useState(session.data?.user.settings.progress_report_days || 5);

  const [scheduling, setScheduling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<'SCHEDULED' | 'SENT'>('SCHEDULED');

  const removeEmail = (pos: number) => {
    setEmails(emails.filter((_, i) => i !== pos));
  };

  useFocusEffect(
    React.useCallback(() => {
      setScheduleDays(session.data?.user.settings.progress_report_days || 5);
      BackendClient.get<ProgressRecipientsRes>('/progress/report/recipients')
        .then(validateResponse)
        .then((res) => {
          setActualEmails(res.recipients);
          setEmails(res.recipients);
        })
        .catch((err) => {
          console.warn('Cannot fetch progress recipients', err);
        });
    }, [session])
  );

  const send = () => {
    setSending(true);
    BackendClient.post<Res>('/progress/report/send', { recipients: [email] })
      .then(validateResponse)
      .then(() => {
        setEmail(undefined);
        setShowModal(true);
        setModalMessage('SENT');
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn(`Cannot send report to '${email}'`, err);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const updateSetting = async () => {
    const UUID = session.userUUID;
    if (!UUID || scheduleDays === session.data?.user.settings.progress_report_days) {
      return;
    }
    const settings: Partial<UserSettings> = {
      progress_report_days: scheduleDays,
    };
    return BackendClient.put<Res<FUser>>(`/user/${UUID}/settings`, settings)
      .then(validateResponse)
      .then((res) => {
        session.updateUserData(res.user);
      })
      .catch((err) => {
        console.warn(`Cannot update user setting progress_report_days to ${scheduleDays}`, err);
      });
  };

  const addUsers = async () => {
    const toAdd = emails.filter((e) => !actualEmails.includes(e));
    if (toAdd.length === 0) {
      return;
    }
    return BackendClient.post<ProgressRecipientsRes>('/progress/report/recipients/add', { recipients: toAdd })
      .then(validateResponse)
      .then(() => setActualEmails([...actualEmails, ...toAdd]))
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot add recipients to progress recipients', err);
      });
  };

  const removeUsers = async () => {
    const toRemove = actualEmails.filter((e) => !emails.includes(e));
    if (toRemove.length === 0) {
      return;
    }
    return BackendClient.delete<ProgressRecipientsRes>('/progress/report/recipients/remove', {
      data: { recipients: toRemove },
    })
      .then(validateResponse)
      .then(() => setActualEmails(actualEmails.filter((e) => toRemove.includes(e))))
      .catch((err) => {
        console.warn('Cannot remove recipients to progress recipients', err);
      });
  };

  const schedule = () => {
    setScheduling(true);
    Promise.all([addUsers(), removeUsers(), updateSetting()])
      .then(() => {
        setShowModal(true);
        setModalMessage('SCHEDULED');
      })
      .catch((err) => {
        console.warn('Cannot update schedule', err);
      })
      .finally(() => setScheduling(false));
  };

  const validEmail = !!email && email.length > 5 && EmailValidator.validate(email);
  const validEmailTmp = !!emailTmp && emailTmp.length > 5 && EmailValidator.validate(emailTmp);
  const canPressScheduler =
    scheduleDays !== session.data?.user.settings.progress_report_days ||
    emails.some((e) => !actualEmails.includes(e)) ||
    actualEmails.some((e) => !emails.includes(e));

  return (
    <View style={styles.rootMain}>
      <Modal visible={showModal} animationType='slide' transparent={false}>
        <ModalWrapper
          styles={{ root: styles.modalRoot }}
          backgroundViewStyles={{ top: styles.modalTop, middle: styles.modalMiddle }}
          onClose={() => setShowModal(false)}>
          <Text bold center size={25}>
            Progress Report
          </Text>
          <Space margin={10} />
          <Text center>{modalMessage}</Text>
          <Space />
          <View style={styles.modalButtonContainer}>
            <Button horizontalButtonPadding={50} onPress={() => setShowModal(false)}>
              OK
            </Button>
          </View>
          <Space />
        </ModalWrapper>
      </Modal>

      <ScrollView style={styles.root}>
        <Space margin={15} />
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
          <Card>
            <Text center bold>
              Send A Progress Report
            </Text>
            <Space margin={10} />
            <Text center>
              Enter the email address of your counselor, self-help group sponsor, partner, parent, friend, or anyone
              else on your safety team
            </Text>
            <Space />

            <TextInput
              value={email}
              placeholder={'Email Address'}
              onChangeText={(text) => setEmail(text)}
              keyboardType='email-address'
              textContentType='emailAddress'
            />
            <Space />
            <View style={styles.sendReport}>
              <Button disabled={!validEmail} loading={sending} onPress={() => send()}>
                SEND REPORT
              </Button>
            </View>
            <Space margin={15} />

            <Text bold center>
              Send Automatic Progress Reports
            </Text>
            <Space />
            <Text center>By clicking the button below you agree to share your progress, attendance and rewards</Text>
            <Space />
            <View style={styles.toContainer}>
              <Text size={14}>To:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toInputs}>
                {emails.map((to, index) => (
                  <View key={index} style={styles.toChip}>
                    <Pressable onPress={() => removeEmail(index)}>
                      <SVG.Cancel width={20} height={20} fill={styles.toChipSVG.color} />
                    </Pressable>
                    <Text style={styles.toText} size={13}>
                      {to}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.confirmContainer}>
              <TextInput
                style={styles.confirmInput}
                value={emailTmp}
                placeholder={'Add new email'}
                onChangeText={(text) => setEmailTmp(text)}
                keyboardType='email-address'
                textContentType='emailAddress'
              />
              <Button
                horizontalButtonPadding={10}
                disabled={!validEmailTmp}
                onPress={() => {
                  if (!emailTmp) {
                    return;
                  }
                  setEmails([...(emails || []), emailTmp]);
                  setEmailTmp(undefined);
                }}>
                CONFIRM
              </Button>
            </View>
            <Space margin={10} />
            <View style={styles.scheduleContainer}>
              <Text size={12}>Send Progress Report every </Text>
              <Pressable style={styles.schedulePicker} onPress={() => schedulePickerRef.current?.open()}>
                <Text size={16}>{scheduleDays}</Text>
                <Space horizontal />
                <SVG.More width={25} height={25} fill={styles.scheduleMoreSVG.color} />
              </Pressable>
              <Text size={12}> days</Text>
            </View>
            <Space margin={15} />
            <View style={styles.scheduleButtonContainer}>
              <Button disabled={!canPressScheduler} loading={scheduling} onPress={() => schedule()}>
                {emails.length === 0 && actualEmails.length !== 0 && 'DISABLE SCHEDULE'}
                {emails.length > 0 && actualEmails.length === 0 && 'SCHEDULE REPORT'}
                {emails.length > 0 && actualEmails.length > 0 && 'UPDATE SCHEDULE'}
              </Button>
            </View>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>

      <Picker
        ref={schedulePickerRef}
        selected={scheduleDays}
        items={[
          { value: 5, label: '5' },
          { value: 4, label: '4' },
          { value: 3, label: '3' },
          { value: 2, label: '2' },
          { value: 1, label: '1' },
        ]}
        onDone={(selected) => typeof selected === 'number' && setScheduleDays(selected as number)}
      />
    </View>
  );
};
