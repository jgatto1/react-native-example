import React, { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { Button, Card, Divider, NewPost, RatingStars, Space, Text } from 'components';
import { ScrollView } from 'react-native-gesture-handler';
import { useNextSessionStyles } from './NextSession.styles';
import { useCohortTopic } from '../../CohortTopic.context';
import { useZoomContext } from './ZoomMeeting.context';
import moment from 'moment';
// import { BackendClient } from 'service/backend-client.service';
// import { validateResponse } from 'model/backend';
// import { MeetingRegistrantRes } from 'model/backend/zoom-data';
import { WeeklyTopicRoutes } from 'containers/Main/Home/WeeklyTopic/WeeklyTopic.stack.routes';
import { BackendClient } from 'service/backend-client.service';
import { MeetingRegistrantRes } from 'model/backend/zoom-data';
import { validateResponse } from 'model/backend';

const MEETING_DONE = 'This meeting ocurred on ';
const MEETING_IN_FUTURE = 'Next group meeting starts in ';
const MEETING_STARTED = 'Group meeting has started!';

export const NextSession = () => {
  const { currentEvent } = useCohortTopic();
  const zoomData = useZoomContext();
  const styles = useNextSessionStyles();

  // const reviewUri = `/topic/${currentEvent.topic.id}/reflection/create`;
  const [loadingRating, setLoadingRating] = useState(false);
  const [rated, setRated] = useState(false);
  const onRatingSend = () => {
    setLoadingRating(true);
    setTimeout(() => {
      setLoadingRating(false);
      setRated(true);
    }, 2000);
  };

  const now = moment();
  const meetEnded = moment(zoomData.meetingEndTime).diff(now) <= 0;
  const meetStartsInFiveOrLess = moment(zoomData.meetingStartTime).diff(now) <= 5;
  const meetStarted = moment(zoomData.meetingStartTime).diff(now) <= 0;
  const meetingIsHappening = meetStartsInFiveOrLess && !meetEnded;
  // const [timeUntilMeet, setTimeUntilMeet] = useState(moment(moment(zoomData.meetingStartTime).diff(now)));
  const timeUntilStart = moment(zoomData.meetingStartTime).diff(now);
  const durationUntilStart = moment.duration(timeUntilStart);
  const [timeUntilMeet, setTimeUntilMeet] = useState(durationUntilStart);

  const getMeetingInfo = () => {
    if (meetEnded) {
      return MEETING_DONE + moment(zoomData.meetingEndTime).format('MMM DD, hh:mm A');
    } else {
      return meetStarted
        ? MEETING_STARTED
        : `${MEETING_IN_FUTURE} ${timeUntilMeet.days()}D:${timeUntilMeet.hours()}HR:${timeUntilMeet.minutes()}M:${timeUntilMeet.seconds()}S`;
    }
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const timeUntilStart = moment(zoomData.meetingStartTime).diff(now);
      const durationUntilStart = moment.duration(timeUntilStart);
      setTimeUntilMeet(durationUntilStart);
    }, 1000);
    return () => clearInterval(timeInterval);
  });

  const [joiningZoom, setJoiningZoom] = useState(false);

  const onJoinCallTap = () => {
    if (!zoomData.meetingId || !zoomData.joinUrl) {
      return;
    }
    // Linking.openURL(zoomData.joinUrl);
    setJoiningZoom(false);
    // workaround 04-29-23
    console.log(zoomData);
    BackendClient.get<MeetingRegistrantRes>(`/meeting/${zoomData.meetingId}/registrant`)
      .then(validateResponse)
      .then((res) => Linking.openURL(res.meeting_registrant.join_url))
      .catch((err) => {
        console.warn('Cannot do registrant to zoom meeting ' + zoomData.meetingId, zoomData, err);
      })
      .finally(() => setJoiningZoom(false));
  };

  const onLeaveFeedbackTap = () => {
    if (zoomData.feedbackUrl) {
      Linking.openURL(zoomData.feedbackUrl).catch((err: any) => {
        console.error('Failed opening leave feedback: ', err);
      });
    } else {
      Linking.openURL('https://forms.gle/oyrp6CeSNvASNV4d6').catch((err: any) => {
        console.error('Failed opening leave feedback: ', err);
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Card style={styles.weekCard}>
          <Text style={styles.weekText}>
            Week {(currentEvent.index as number) + 1}: <Text italic>{currentEvent.topic.name}</Text>
          </Text>
        </Card>
        <Text numberOfLines={1} style={styles.text} bold>
          {getMeetingInfo()}
        </Text>
        <Space margin={8} />
        <Button disabled={!meetingIsHappening} loading={joiningZoom} onPress={onJoinCallTap} style={styles.button}>
          <Text style={styles.buttonText}>CLICK TO JOIN SESSION</Text>
        </Button>
        <Space margin={10} />
        <Divider style={{ borderWidth: 0.6 }} />
        <Space margin={16} />
        <Text bold size={18}>
          Session feedback
        </Text>
        <Space margin={6} />
        <Text size={16}>After the session, say how it went</Text>
        <Space />
        <Button disabled={!(meetStartsInFiveOrLess || meetEnded)} onPress={onLeaveFeedbackTap} style={styles.button}>
          LEAVE FEEDBACK
        </Button>
      </View>
      {meetingIsHappening && (
        <>
          <View style={styles.feedbackBlock}>
            <Text size={16}>
              How helpful is the <Text italic>{currentEvent.topic.name}</Text> topic to you?
            </Text>
            <Space />
            <RatingStars loading={loadingRating} sendRate={onRatingSend} rated={rated} />
          </View>
          <NewPost
            styleContainer={styles.newPost}
            title={'Rate this topic and share your thoughts'}
            onSubmitNavigateRoute={WeeklyTopicRoutes.MENU}
            subtitle={
              <Text>
                How helpful is the <Text italic>{currentEvent.topic.name}</Text> topic to you?
              </Text>
            }
            placeholder='Write something...'
            subtitleDivider={false}
            minimized
          />
        </>
      )}
    </ScrollView>
  );
};
