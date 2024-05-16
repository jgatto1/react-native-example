import { ActivityIndicator, Dimensions, Modal, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useReachOutLeaderOfficeHoursStyles } from './ReachOutLeaderOfficeHours.styles';
import { Button, Card, Text } from 'components';
import { ScheduledEvent, ScheduledEventsRes } from 'model/backend/scheduled-event';
import { useFocusEffect } from '@react-navigation/native';
import { BackendClient } from 'service/backend-client.service';
import { F, Res, validateResponse } from 'model/backend';
import { User } from 'model/backend/login';
import { useSession } from 'providers/session/SessionProvider';
import moment from 'moment';
import { Space } from 'components/Space/Space';
import { ModalWrapper } from 'components/Modal/Modal';
import {
  ReachOutCopingCoachModalForm,
  ReachOutFormData,
} from 'containers/Main/ReachOut/CopingCoach/modal/Form/ReachOutCopingCoachModalForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showAlertIfNetworkError } from 'providers/error.alert';

interface NextEvents {
  next?: ScheduledEvent;
  all: ScheduledEvent[];
}

interface Events {
  events: NextEvents;
  loading?: boolean;
}

const NO_EVENTS: Events = { events: { all: [] } };

function started(event: ScheduledEvent): boolean {
  const now = new Date();
  return now > new Date(event.start_at) && now < new Date(event.end_at);
}

async function buildNextEvents(events: ScheduledEvent[]): Promise<NextEvents> {
  if (!events || events.length === 0) {
    return NO_EVENTS.events;
  }
  const [next, ...all] = events;

  return { next, all };
}

async function searchEvents(leaders: User[]): Promise<NextEvents> {
  if (leaders.length === 0) {
    return NO_EVENTS.events;
  }
  const firstLeader = leaders[0];
  const data = {
    start_at: moment().utc().format('dddd, DD MMMM yyyy HH:mm:ss'),
    resource_type: 'leader office hours',
    resource_id: 'anything',
    invitees: [
      {
        invitee_type: 'user',
        invitee_id: firstLeader.uuid,
      },
    ],
  };
  return BackendClient.post<ScheduledEventsRes>('/scheduled_events', data)
    .then(validateResponse)
    .then((res) => res.scheduled_events)
    .then((events) => {
      return buildNextEvents(events);
    })
    .catch((err) => {
      showAlertIfNetworkError(err);
      console.warn(`Cannot fetch schedule events for leader ${firstLeader.uuid}`, err);
      return NO_EVENTS.events;
    });
}

export const ReachOutLeaderOfficeHours: React.VFC = () => {
  const styles = useReachOutLeaderOfficeHoursStyles();
  const session = useSession();

  const [events, setEvents] = useState<Events>({ loading: true, ...NO_EVENTS });

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formDone, setFormDone] = useState(false);
  const [doingRequest, setDoingRequest] = useState(false);
  const [sentData, setSentData] = useState<string>();

  const requestStorageKeyGen = (eventId: number) =>
    `ReachOut-LeaderOfficeHours-Request-Event-${eventId}-User-${session.userUUID}`;
  const [requestSent, setRequestSent] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const cohort_id = session.data?.user.cohort.id;
      if (!cohort_id) {
        return;
      }
      BackendClient.get<Res<F<'users', User[]>>>('/users', { params: { cohort_id } })
        .then(validateResponse)
        .then((res) => res.users.filter((user) => user.roles.includes('leader')))
        .then(async (leaders) => {
          const eventsFound = await searchEvents(leaders);
          if (eventsFound.next?.id) {
            AsyncStorage.getItem(requestStorageKeyGen(eventsFound.next.id))
              .then((value) => setRequestSent(!!value))
              .catch((err) => {
                console.warn('Cannot fetch request reach out leader office hours request event', err);
              });
          }
          setEvents({ events: eventsFound });
        })
        .catch((err) => {
          console.warn(`Cannot load users for cohort ${cohort_id}`, err);
          setEvents(NO_EVENTS);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const hasEvents = !!events.events.next || events.events.all.length > 0;

  const closeModal = () => {
    setShowRequestForm(false);
    setFormDone(false);
    setSentData(undefined);
  };

  const doRequest = (data: ReachOutFormData) => {
    if (!data.email && !data.phone) {
      return;
    }
    if (!events.events.next) {
      return;
    }
    const next = events.events.next;
    setDoingRequest(true);
    const params = {
      user_uuid: next.invitees[0].invitee_id,
      role: 'leader',
      phone_number: data.phone,
      email: data.email,
      preferred_contact_methods:
        [!!data.email && 'Text', !!data.phone && 'Voice'].filter(Boolean).join('\n') || undefined,
    };
    BackendClient.post<Res>('/reach_out', params)
      .then(() => {
        setFormDone(true);
        setSentData(['phone', 'email'].filter((key) => (key === 'phone' ? !!data.phone : !!data.email)).join(' and '));
        AsyncStorage.setItem(requestStorageKeyGen(next.id), 'true')
          .then(() => setRequestSent(true))
          .catch((err) => {
            console.warn('Cannot set storage for requested event reach out leader office hours request event', err);
          });
      })
      .finally(() => setDoingRequest(false));
  };

  const FormText = (
    <Text>
      <Text italic>Seeking Safety</Text> Leader
    </Text>
  );

  return (
    <View style={styles.root}>
      <Modal visible={showRequestForm} animationType='slide' transparent={false}>
        <ModalWrapper
          styles={{ root: styles.modalRoot }}
          backgroundViewStyles={{ top: styles.modalTop, middle: styles.modalMiddle, bottom: styles.modalBottom }}
          onClose={() => closeModal()}>
          {!formDone && (
            <ScrollView style={{ maxHeight: Dimensions.get('window').height * 0.7 }}>
              <ReachOutCopingCoachModalForm
                loading={doingRequest}
                title={FormText}
                type={FormText}
                onNext={doRequest}
                onCancel={() => closeModal()}
              />
              <Space />
            </ScrollView>
          )}
          {formDone && (
            <View style={{ padding: 10, marginTop: 30 }}>
              <Text>
                Your <Text bold>{sentData}</Text> {sentData?.includes('and') ? 'have' : 'has'} been sent to the{' '}
                <Text bold italic>
                  Seeking Safety Leader.
                </Text>
              </Text>
              <Space margin={10} />
              <Text>
                You will be contacted by the{' '}
                <Text bold italic>
                  Seeking Safety Leader
                </Text>{' '}
                soon.
              </Text>
              <View style={styles.doneContainer}>
                <Button onPress={() => closeModal()}>DONE</Button>
              </View>
            </View>
          )}
        </ModalWrapper>
      </Modal>
      {events.loading && (
        <>
          <Space />
          <ActivityIndicator color='grey' />
        </>
      )}
      {!events.loading && (
        <>
          {!hasEvents && (
            <>
              <Space margin={10} />
              <Text size={15} bold center>
                No Upcoming Office Hours
              </Text>
            </>
          )}
          {hasEvents && (
            <ScrollView style={styles.scrollRoot}>
              <Space margin={10} />
              {!!events.events.next && (
                <Card>
                  <Text center bold size={15}>
                    {started(events.events.next) ? (
                      <Text size={22}>Office hours have started</Text>
                    ) : (
                      'Next Office Hours'
                    )}
                  </Text>
                  <Space />
                  <Text size={15} center>
                    <Text bold>{moment(events.events.next.start_at).format('MMMM DD')}</Text> from{' '}
                    {moment(events.events.next.start_at).format('hh:mm A')} to{' '}
                    {moment(events.events.next.end_at).format('hh:mm A')}
                  </Text>
                  <Space />
                  {started(events.events.next) && (
                    <>
                      <Text italic center size={13}>
                        To be contacted by your{'\n'}Seeking Safety Leader
                      </Text>
                      <Space margin={4} />
                      <View style={styles.requestButtonContainer}>
                        {requestSent ? (
                          <Text bold center size={15}>
                            Request sent, thank you!
                          </Text>
                        ) : (
                          <Button
                            horizontalButtonPadding={10}
                            textStyle={styles.requestButtonText}
                            onPress={() => setShowRequestForm(true)}>
                            REQUEST TO BE CONTACTED
                          </Button>
                        )}
                        <Space margin={6} />
                      </View>
                    </>
                  )}
                  {!started(events.events.next) && (
                    <>
                      <Text center italic size={12}>
                        Connect with your Seeking Safety Leader then
                      </Text>
                      <Space margin={10} />
                      <Text center bold size={12}>
                        Active in {moment(events.events.next.start_at).fromNow()}
                      </Text>
                      <Space margin={4} />
                    </>
                  )}
                </Card>
              )}
              {!!events.events.all.length && (
                <>
                  <Space margin={10} />
                  <Text center bold>
                    Upcoming Office Hours
                  </Text>
                  <Space margin={10} />
                  {events.events.all.map((event) => (
                    <View key={event.id}>
                      <Card>
                        <Text center bold size={12}>
                          Office Hours scheduled for:
                        </Text>
                        <Space margin={10} />
                        <Text center size={12}>
                          <Text bold>{moment(event.start_at).format('MMMM DD')}</Text> from{' '}
                          {moment(event.start_at).format('hh:mm A')} to {moment(event.end_at).format('hh:mm A')}
                        </Text>
                        <Space margin={10} />
                      </Card>
                      <Space margin={10} />
                    </View>
                  ))}
                </>
              )}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};
