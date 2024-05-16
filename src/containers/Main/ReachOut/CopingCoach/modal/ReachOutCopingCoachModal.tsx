import { Modal, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useReachOutCopingCoachModalStyles } from './ReachOutCopingCoachModal.styles';
import { ModalWrapper } from 'components/Modal/Modal';
import { User } from 'model/backend/login';
import { Button, Text } from 'components';
import { Space } from 'components/Space/Space';
import { DefaultAvatar } from 'components/Avatar/Avatar';
import {
  ReachOutCopingCoachModalForm,
  ReachOutFormData,
} from 'containers/Main/ReachOut/CopingCoach/modal/Form/ReachOutCopingCoachModalForm';
import { ReachOutCopingCoachSelectHour } from 'containers/Main/ReachOut/CopingCoach/modal/Hour/ReachOutCopingCoachSelectHour';
import { Res, validateResponse } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';
import { showAlertIfNetworkError } from 'providers/error.alert';

interface ReachOutCopingCoachModalProps {
  coach: User | undefined;
  form: boolean;
  onClose: () => void;
}

export const ReachOutCopingCoachModal: React.VFC<ReachOutCopingCoachModalProps> = ({ coach, form, onClose }) => {
  const styles = useReachOutCopingCoachModalStyles();

  const visible = !!coach;
  const [showForm, setShowForm] = useState<boolean>(form);

  const [reachOutState, setReachOutState] = useState<'DATA' | 'HOUR' | 'DONE'>('DATA');

  const [data, setData] = useState<ReachOutFormData>();
  const [scheduling, setScheduling] = useState(false);

  useEffect(() => {
    setShowForm(form);
  }, [form]);

  const close = () => {
    setShowForm(form);
    setData(undefined);
    setReachOutState('DATA');
    onClose();
  };

  const goToSelectHour = (d: ReachOutFormData) => {
    setData(d);
    setReachOutState('HOUR');
  };

  const scheduleMeeting = (hours: string[]) => {
    if (!coach) {
      return;
    }
    setScheduling(true);
    const params = {
      user_uuid: coach?.uuid,
      role: 'coping_coach',
      email: data?.email,
      phone_number: data?.phone,
      preferred_contact_methods: [!!data?.email && 'Email', !!data?.phone && 'Voice']
        .filter(Boolean)
        .map((d) => (d === 'Email' ? 'Text' : 'Voice'))
        .join('\n'),
      times: hours.join('\n'),
    };
    // mockOkReq()
    BackendClient.post<Res>('/reach_out', params)
      .then(validateResponse)
      .then(() => {
        setReachOutState('DONE');
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn(`Cannot schedule meeting with coping coach ${coach?.uuid}`, err);
      })
      .finally(() => setScheduling(false));
  };

  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
      <ModalWrapper
        styles={{ root: [styles.modalRoot, styles.modalRootDone] }}
        backgroundViewStyles={{
          top: [styles.topDone],
          bottom: [styles.modalBottom, styles.bottomDone],
          middle: [styles.modalMiddle, styles.middleDone],
        }}
        onClose={() => close()}>
        <View style={styles.cardContent}>
          {showForm && (
            <>
              {reachOutState === 'DATA' && <ReachOutCopingCoachModalForm onNext={goToSelectHour} onCancel={close} />}
              {reachOutState === 'HOUR' && (
                <ReachOutCopingCoachSelectHour onNext={scheduleMeeting} onCancel={close} scheduling={scheduling} />
              )}
              {reachOutState === 'DONE' && (
                <>
                  <Text center>Your contact information has been sent</Text>
                  <Space margin={10} />
                  <Text center>
                    You will be contacted by the Coping Coach{' '}
                    <Text bold italic>
                      {coach?.settings.display_name}
                    </Text>{' '}
                    soon.
                  </Text>
                  <Space margin={10} />
                  <View style={styles.doneButtonContainer}>
                    <Button onPress={close}>DONE</Button>
                  </View>
                </>
              )}
            </>
          )}
          {!showForm && (
            <>
              <Space />
              <Text bold center>
                {coach?.settings.display_name}
              </Text>
              <Space margin={10} />
              <View style={styles.avatarContainer}>
                <DefaultAvatar size={40} />
              </View>
              <Space margin={10} />
              <Text bold center>
                Coach Full Bio
              </Text>
              <ScrollView style={styles.fullBioScroll}>
                <Text>{coach?.settings.about_me_long}</Text>
              </ScrollView>
              <Space />
              <View style={styles.reachOutButtonContainer}>
                <Button horizontalButtonPadding={60} onPress={() => setShowForm(true)}>
                  MORE INFO
                </Button>
              </View>
              <Space />
            </>
          )}
        </View>
      </ModalWrapper>
    </Modal>
  );
};
