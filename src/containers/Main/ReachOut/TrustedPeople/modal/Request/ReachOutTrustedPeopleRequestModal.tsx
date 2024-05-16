import React, { useEffect, useState } from 'react';
import { useReachOutTrustedPeopleRequestModalStyles } from './ReachOutTrustedPeopleRequestModal.styles';
import { Button, Modal as ModalWrapper, Text, TextInput } from 'components';
import { Modal, View } from 'react-native';
import { TrustedPerson } from 'model/backend/trusted-people';
import { RadioButtons } from 'components/RadioButtons/RadioButtons';
import { Space } from 'components/Space/Space';
import { Res, validateResponse } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';
import { showAlertIfNetworkError } from 'providers/error.alert';

export declare type TrustedPersonRequestType = 'MESSAGE' | 'CALL';

interface ReachOutTrustedPeopleRequestModalProps {
  selected: TrustedPerson | undefined;
  onClose: () => void;
  type: TrustedPersonRequestType;
}

const SELECT = {
  MESSAGE: [
    "I'm safe but having hard time. Can you remind me of something positive, something to be grateful for!",
    "Thinking of you. Let me know how you're doing.",
    "Hey I'd like to get an upbeat text from you. I'm fine, just like to hear from you",
    'I just coped well with a challenge. Please text me a hug',
  ],
  CALL: [
    'I have some good new about my recovery. Call me!',
    "When you get a moment, please call, I'd just like to chat a bit. It's not urgent.",
    "I'd like you to call me ASAP if you can, I'm struggling.",
    'It would be great to hear your voice!',
  ],
};

export const ReachOutTrustedPeopleRequestModal: React.VFC<ReachOutTrustedPeopleRequestModalProps> = ({
  selected,
  onClose,
  type,
}) => {
  const styles = useReachOutTrustedPeopleRequestModalStyles();

  const [state, setState] = useState<'INITIAL' | 'NAME' | 'END'>('INITIAL');
  const [subject, setSubject] = useState<string>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    setSubject(SELECT[type][0]);
  }, [type]);

  const [doingRequest, setDoingRequest] = useState(false);

  const visible = !!selected && !!selected.uuid;

  const close = () => {
    setState('INITIAL');
    setName(undefined);
    onClose();
  };

  const doRequest = () => {
    if (!selected) {
      return;
    }
    const data = {
      message: subject,
      first_name: name,
    };
    setDoingRequest(true);
    BackendClient.post<Res>(`/trusted_person/${selected.uuid}/reach_out`, data)
      .then(validateResponse)
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn(`Cannot reach out trusted person ${selected.uuid}`, err);
      })
      .finally(() => {
        setDoingRequest(false);
        setState('END');
      });
  };

  return (
    <Modal visible={visible} animationType='slide' transparent={false}>
      <ModalWrapper
        styles={{ root: styles.modalRoot }}
        backgroundViewStyles={{ top: styles.modalTop, middle: styles.modalMiddle }}
        onClose={() => close()}>
        <View>
          {state === 'INITIAL' && (
            <>
              <Text bold center>
                Request a {type === 'CALL' ? 'Call' : 'Message'}
              </Text>
              <Space margin={10} />
              <RadioButtons
                labelStyle={{ lineHeight: 22, fontSize: 13 }}
                initial={0}
                items={SELECT[type].map((label, value) => ({ label, value }))}
                onSelect={(index) => setSubject(SELECT[type][index])}
              />
              <Space />
              <View style={styles.initialButtons}>
                <Button style={styles.closeButton} textStyle={styles.closeButtonText} onPress={() => close()}>
                  CANCEL
                </Button>
                <Button style={styles.continueButton} onPress={() => setState('NAME')}>
                  CONTINUE
                </Button>
              </View>
            </>
          )}

          {state === 'NAME' && (
            <>
              <Text bold center>
                Share Your Name
              </Text>
              <Space />
              <Text size={14} lineHeight={22}>
                Your identity will be revealed to your trusted person.
              </Text>
              <Space margin={10} />
              <Text>Name</Text>
              <TextInput autoFocus placeholder='Your name' onChangeText={(text) => setName(text)} />
              <View style={styles.initialButtons}>
                <Button style={styles.closeButton} textStyle={styles.closeButtonText} onPress={() => close()}>
                  CANCEL
                </Button>
                <Button
                  disabled={!name || name.length < 1}
                  style={styles.continueButton}
                  loading={doingRequest}
                  onPress={() => doRequest()}>
                  DONE
                </Button>
              </View>
            </>
          )}

          {state === 'END' && (
            <>
              <Text bold center>
                {type === 'CALL' ? 'Request for a call sent!' : 'Message sent!'}
              </Text>
              <Space margin={10} />
              <Text center>
                <Text bold>{selected?.first_name}</Text>{' '}
                {type === 'CALL' ? 'will receive your request, expect the call soon.' : 'will receive your message.'}
              </Text>
              <Space margin={10} />
              <View style={styles.endButtonContainer}>
                <Button onPress={() => close()}>OK</Button>
              </View>
            </>
          )}
        </View>
      </ModalWrapper>
    </Modal>
  );
};
