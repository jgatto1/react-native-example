import { Modal, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useTriggerPrepareAheadStyles } from './TriggerPrepareAhead.styles';
import { Button, Card, Divider, Text } from 'components';
import { Space } from 'components/Space/Space';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TriggerPrepareAheadRoutes } from 'containers/Main/Trigger/PrepareAhead/TriggerPrepareAhead.routes';
import moment from 'moment';
import { BackendClient } from 'service/backend-client.service';
import { TriggerPrepEvent, TriggerPrepEventsRes } from 'model/backend/trigger-prep.event';
import { validateResponse } from 'model/backend';
import { LINKS_HASH } from 'containers/Main/Safety/Boomerang/Card/SafetyBoomerangCard.links';
import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { ModalWrapper } from 'components/Modal/Modal';

export const TriggerPrepareAhead: React.VFC = () => {
  const styles = useTriggerPrepareAheadStyles();
  const navigation = useNavigation();

  const [events, setEvents] = useState<TriggerPrepEvent[]>([]);
  const [cancelling, setCancelling] = useState<{ [key: number]: boolean }>({});

  const [showCanceledModal, setShowCanceledModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      BackendClient.get<TriggerPrepEventsRes>('/trigger_prep_events')
        .then(validateResponse)
        .then((res) => {
          setEvents(res.trigger_prep_events);
        })
        .catch((err) => {
          console.warn('Cannot fetch trigger prep events', err);
        });
    }, [])
  );

  const goTo = (action: string) => {
    navigation.navigate((action && LINKS_HASH[action].route) || SafetyRoutes.MENU, {
      ...(action ? LINKS_HASH[action].params : {}),
      // backUrl: TriggerRoutes.PREPARE_AHEAD,
    });
  };

  const cancel = (event: TriggerPrepEvent) => {
    setCancelling({ ...cancelling, [event.id]: true });
    BackendClient.delete(`/trigger_prep_event/${event.id}/delete`)
      .then(validateResponse)
      .then(() => {
        setShowCanceledModal(true);
        setEvents([...events.filter((e) => e.id !== event.id)]);
      })
      .catch((err) => {
        console.warn('Cannot delete schedule trigger prep event: ' + event.id, err);
      })
      .finally(() => {
        setCancelling({ ...cancelling, [event.id]: false });
      });
  };

  return (
    <View style={styles.mainRoot}>
      <Modal visible={showCanceledModal} animationType='slide' transparent={false}>
        <ModalWrapper
          styles={{ root: styles.modalRoot }}
          backgroundViewStyles={{ top: styles.modalTop, middle: styles.modalMiddle }}
          onClose={() => setShowCanceledModal(false)}>
          <Text bold center size={20}>
            Trigger Canceled
          </Text>
          <Space margin={5} />
          <View style={styles.buttons}>
            <Button horizontalButtonPadding={30} onPress={() => setShowCanceledModal(false)}>
              OK
            </Button>
          </View>
        </ModalWrapper>
      </Modal>

      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <Space margin={15} />
        <Card>
          <Text bold center>
            Send your future self a Trigger Coping Message
          </Text>
          <Space margin={10} />
          <Text center lineHeight={22} size={14}>
            Is there a day coming up when you're likely to feel triggered? Create a coping message now to help when the
            time comes.
          </Text>
          <Space margin={10} />
          <View style={styles.buttons}>
            <Button
              horizontalButtonPadding={5}
              onPress={() => navigation.navigate(TriggerPrepareAheadRoutes.COPING_MESSAGE)}>
              SET UP TRIGGER COPING MESSAGE
            </Button>
          </View>
          <Space />
        </Card>
        <Space margin={15} />
        <Card>
          <Text bold center>
            Customize Trigger Support
          </Text>
          <Space margin={10} />
          <Text center>Tap below to customize your Trigger</Text>
          <Space margin={10} />
          <View style={styles.buttons}>
            <Button
              horizontalButtonPadding={50}
              onPress={() => navigation.navigate(TriggerPrepareAheadRoutes.CUSTOMIZE)}>
              CUSTOMIZE SUPPORT
            </Button>
          </View>
        </Card>

        {events.length > 0 && (
          <>
            <Space margin={15} />
            <Text bold center>
              SCHEDULED TRIGGER PREPARATIONS
            </Text>
          </>
        )}
        {events.map((event) => (
          <View key={event.id}>
            <Space margin={15} />
            <Card style={styles.scheduleCard}>
              <Text bold>Scheduled for:</Text>
              <Space />
              <Text>{moment(event.scheduled_event.start_at).format('MMM DD, YYYY, h:mm A')}</Text>
              <Divider margin={15} style={{ borderWidth: 0.1 }} />
              <Text bold>Try This Safety Activity</Text>
              <Space />
              <Button
                disabled={!event.app_action}
                horizontalButtonPadding={5}
                textStyle={styles.activityButtonText}
                onPress={() => goTo(event.app_action)}>
                {(event.app_action || '').toUpperCase()}
              </Button>
              <Divider margin={15} style={{ borderWidth: 0.1 }} />
              <Text bold>Additional message:</Text>
              <Space />
              <Text>{event.message}</Text>
              <Space margin={15} />
              <View style={styles.scheduleCardCancelContainer}>
                <Button
                  loading={cancelling[event.id]}
                  textStyle={styles.scheduleCardCancelButtonText}
                  style={styles.scheduleCardCancelButton}
                  horizontalButtonPadding={10}
                  onPress={() => cancel(event)}>
                  CANCEL
                </Button>
              </View>
            </Card>
          </View>
        ))}
        <Space margin={15} />
      </ScrollView>
    </View>
  );
};
