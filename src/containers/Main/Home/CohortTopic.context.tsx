import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'providers/session/SessionProvider';
import { validateResponse } from 'model/backend';
import { ScheduledEvent, ScheduledEventsRes } from 'model/backend/scheduled-event';
import { Topic, TopicRes } from 'model/backend/topic';
import { BackendClient } from 'service/backend-client.service';

export interface CohortTopicContext {
  prevEvents: Partial<ScheduledEvent>[];
  currentEvent: CohortEvent;
  dailyActionText?: string;
  weeklyTopicText?: string;
  loading?: boolean;
}

type CohortEvent = { topic: Topic; index?: number; noEvent?: boolean } & Pick<
  Partial<ScheduledEvent>,
  'start_at' | 'end_at'
>;

const LOADING_TOPIC: Topic = { name: 'Loading Topic..' } as Topic;
export const NO_PREV_TOPIC = 'No Previous Topics.';
export const NO_TOPIC: Topic = { name: 'No current topic.' } as Topic;

const INITIAL_COHORT_EVENT: CohortEvent = { topic: NO_TOPIC, noEvent: true };
const INITIAL_COHORT: CohortTopicContext = {
  prevEvents: [{ event_name: NO_PREV_TOPIC }],
  currentEvent: INITIAL_COHORT_EVENT,
};

const Context = React.createContext<CohortTopicContext>(INITIAL_COHORT);

export const useCohortTopic = () => useContext(Context);

function eventsData(cohort: number) {
  return {
    resource_type: 'topic',
    invitees: [
      {
        invitee_type: 'cohort',
        invitee_id: `${cohort}`,
      },
    ],
  };
}

function eventsSorter(eventA: ScheduledEvent, eventB: ScheduledEvent) {
  const startA = new Date(eventA.start_at);
  const startB = new Date(eventB.start_at);
  return startA > startB ? 1 : -1;
}

function sortEvents(events: ScheduledEvent[]) {
  return events.sort(eventsSorter);
}

export async function fetchTopic(cohort: number): Promise<CohortTopicContext> {
  const sortedEvents = await BackendClient.post<ScheduledEventsRes>('/scheduled_events', eventsData(cohort))
    .then(validateResponse)
    .then(({ scheduled_events }) => {
      return scheduled_events;
    })
    .then(sortEvents);
  const now = Date.now();
  const currentEventIndex = sortedEvents.findIndex(
    ({ start_at, end_at }) => Date.parse(start_at) < now && now < Date.parse(end_at)
  );
  if (!sortedEvents[currentEventIndex]) {
    return {
      prevEvents: [{ event_name: NO_PREV_TOPIC }],
      currentEvent: INITIAL_COHORT_EVENT,
    };
  }

  const currentEvent = sortedEvents[currentEventIndex];
  const prevEvents = sortedEvents.filter((elem, index) => index !== currentEventIndex);

  const topic = await BackendClient.get<TopicRes>(`/topic/${sortedEvents[currentEventIndex].resource_id}`)
    .then((res) => res.data.topic)
    .catch(() => NO_TOPIC);
  return {
    currentEvent: {
      topic: topic,
      noEvent: false,
      index: currentEventIndex,
      start_at: currentEvent.start_at,
      end_at: currentEvent.end_at,
    },
    prevEvents: prevEvents,
    dailyActionText: topic.name,
    weeklyTopicText: topic.name,
  };
}

export const CohortTopicContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CohortTopicContext>({
    prevEvents: [{ event_name: NO_PREV_TOPIC }],
    currentEvent: { topic: LOADING_TOPIC, noEvent: true },
    loading: true,
  });
  const session = useSession();

  useEffect(() => {
    const cohortId = session.data?.user?.cohort?.id;
    if (cohortId || true) {
      fetchTopic(cohortId || 0)
        .then((newData) => {
          setData(newData);
        })
        .catch((err) => {
          console.warn('Cannot load topic and events', err);
          setData({
            prevEvents: [{ event_name: NO_PREV_TOPIC }],
            currentEvent: { topic: NO_TOPIC, noEvent: true },
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};
