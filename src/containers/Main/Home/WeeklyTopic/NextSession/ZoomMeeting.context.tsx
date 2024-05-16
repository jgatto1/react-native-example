import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import { validateResponse } from 'model/backend';
import { Meeting, MeetingRes, MeetingsRes } from 'model/backend/zoom-data';
import { useSession } from 'providers/session/SessionProvider';
import { useCohortTopic } from '../../CohortTopic.context';
import { BackendClient } from 'service/backend-client.service';
// import { meetingRegistrantMock } from '../__mock__/zoom-data';

export interface ZoomMeetingContext {
  meetingId?: number;
  feedbackUrl?: string;
  meetPassword?: string;
  joinUrl?: string;
  duration: number; // duration in minutes
  meetingStartTime: number;
  meetingEndTime: number;
  audioDataUrl?: string;
  loading: boolean;
}

const EMPTY_ZOOM_CONTEXT: ZoomMeetingContext = { loading: false, duration: 0, meetingStartTime: 0, meetingEndTime: 0 };

const Context = React.createContext<ZoomMeetingContext>(EMPTY_ZOOM_CONTEXT);

export const useZoomContext = () => useContext(Context);

const getZoomMeetingData = async (topicId: number, cohortId: number | undefined): Promise<Meeting> => {
  const { meetings } = await BackendClient.get<MeetingsRes>(`/meetings?topic_id=${topicId}&cohort_id=${cohortId}`)
    .then(validateResponse)
    .then((res) => res);

  const lastMeetElem: Meeting = meetings[meetings.length - 1];
  if (!lastMeetElem) {
    throw new Error(`No meetings for topic: ${topicId}`);
  }
  const data = await BackendClient.get<MeetingRes>(`/meeting/${lastMeetElem?.id}`)
    .then(validateResponse)
    .then((res) => res);
  return data.meeting;
};

export const ZoomMeetingContextProvider: React.FC = ({ children }) => {
  const [zoomData, setZoomData] = useState<ZoomMeetingContext>(EMPTY_ZOOM_CONTEXT);
  const session = useSession();
  const { currentEvent } = useCohortTopic();

  const cohortId = session.data?.user.cohort.id;

  useEffect(() => {
    setZoomData({ loading: true, duration: 0, meetingStartTime: 0, meetingEndTime: 0 });
    getZoomMeetingData(currentEvent?.topic?.id, cohortId)
      .then((meeting) => {
        const start = moment(meeting.details.start_time);
        const end = moment(meeting.details.start_time).add(meeting.details.duration, 'm');
        setZoomData({
          meetingId: meeting.id,
          feedbackUrl: meeting.feedback_url,
          meetPassword: meeting.details.encrypted_password,
          duration: meeting.details.duration,
          meetingStartTime: start.valueOf(),
          meetingEndTime: end.valueOf(),
          joinUrl: meeting.details.join_url,
          loading: false,
        });
      })
      .catch((err) => {
        console.warn(`Something went wrong fetching meeting info for topic: ${currentEvent.topic.id}`, err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Context.Provider value={zoomData}>{children}</Context.Provider>;
};
