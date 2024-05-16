import React, { createRef, useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { ArrowButton, Button, Card, Divider, NewPost, Picker, PickerRef, RatingStars, Space, Text } from 'components';
import { useCohortTopic } from '../../CohortTopic.context';
import { usePreviousSessionStyles } from './PreviousSession.styles';
import { useTheme } from 'providers/theme/ThemeProvider';
import { WeeklyTopicRoutes, WeeklyTopicRoutes as Routes } from '../WeeklyTopic.stack.routes';
import { SVG } from '../../../Safety/Boomerang/Create/assets';
import { useNavigation } from '@react-navigation/native';
import { BackendClient } from 'service/backend-client.service';
import { TopicRes } from 'model/backend/topic';
import { Animations } from 'model/backend/animation';
import { Res, validateResponse } from 'model/backend';
import { useSession } from 'providers/session/SessionProvider';
import { MeetingsRes, RecordingUrl } from 'model/backend/zoom-data';
import { meetingsMock } from '../__mock__/zoom-data';

export const PreviousSession = () => {
  const session = useSession();
  const { prevEvents } = useCohortTopic();
  const theme = useTheme();
  const navigation = useNavigation();
  const [loadingRating, setLoadingRating] = useState(false);
  const [loadingPrevTopic, setLoadingPrevTopic] = useState(true);
  const [rated, setRated] = useState(false);
  const [week, setWeek] = useState(prevEvents.length - 1);
  const [prevTopic, setPrevTopic] = useState({ handoutUrl: '', animationUrl: '', zoomAudioUrl: '' });
  const prevTopicsRef = createRef<PickerRef>();
  const styles = usePreviousSessionStyles();

  const cohortId = session.data?.user.cohort.id;

  const onRatingSend = () => {
    setLoadingRating(true);
    setTimeout(() => {
      setLoadingRating(false);
      setRated(true);
    }, 2000);
  };

  const fetchAnimationData = (topicId: number) => {
    return BackendClient.get<Res<Animations>>(`/animations?topic_id=${topicId}`)
      .then(validateResponse)
      .then(({ animations }) => {
        if (!animations.length) {
          throw new Error(`No animations for topic ${topicId}`);
        }
        return BackendClient.get<Res<{ url: string }>>(`/animation/${animations[0].uuid}/url`);
      })
      .then(validateResponse)
      .then((res) => res.url)
      .catch((err) => {
        console.warn(err);
        return '';
      });
  };

  const fetchZoomAudioUrl = (topicId: number) => {
    return BackendClient.get<MeetingsRes>(`meetings?topic_id=${topicId}&cohort_id=${cohortId}`)
      .then(validateResponse)
      .then((res) => {
        if (!meetingsMock.length) {
          throw new Error(`No previous meeting for topic ${topicId}`);
        }
        const lastMeet = res.meetings[res.meetings.length - 1];
        return BackendClient.get<Res<RecordingUrl>>(`meeting/${lastMeet.id}/recording_url`);
      })
      .then(validateResponse)
      .then((res) => res.url)
      .catch((err) => {
        console.warn('Something went wrong fetching previous meet recording url ', err);
        return '';
      });
  };

  const fetchPrevTopicData = async (selectedWeek: number) => {
    setLoadingPrevTopic(true);
    const { data } = await BackendClient.get<TopicRes>(`/topic/${prevEvents[selectedWeek].resource_id}`);
    const animationUrl = await fetchAnimationData(data.topic.id);
    const zoomAudioUrl = await fetchZoomAudioUrl(data.topic.id);
    setLoadingPrevTopic(false);
    setPrevTopic({ handoutUrl: data.topic.handout_url, animationUrl, zoomAudioUrl });
  };

  useEffect(() => {
    fetchPrevTopicData(week);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectWeek = async (selected: number) => {
    setWeek(selected);
    fetchPrevTopicData(selected);
  };

  const to = (route: Routes, params?: { [key: string]: any }) => () => {
    navigation.navigate(route, params);
  };

  const onListenSessionTap = () => {
    prevTopic.zoomAudioUrl &&
      Linking.openURL(prevTopic.zoomAudioUrl).catch((err: any) => {
        console.error('Failed opening zoom recorded session: ', err);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.root}>
          <Card>
            <Pressable style={styles.pickerOpener} onPress={() => prevTopicsRef.current?.open()}>
              <Text>
                Week {week + 1}: <Text italic>{prevEvents[week].event_name}</Text>
              </Text>
              <SVG.Dropdown fill={theme.main.palette.primary} />
            </Pressable>
          </Card>
          <Space margin={6} />
          <View style={styles.feedbackBlock}>
            <Text>
              Write a review of the topic <Text italic>{prevEvents[week].event_name}</Text>
            </Text>
            <Space />
            <RatingStars loading={loadingRating} sendRate={onRatingSend} rated={rated} />
          </View>
          <Space />
          <NewPost
            styleContainer={styles.newPost}
            title={'Rate this topic and share your thoughts'}
            subtitle={`How helpful is the topic ${prevEvents[week].event_name}?`}
            subtitleDivider={false}
            onSubmitNavigateRoute={WeeklyTopicRoutes.MENU}
            onSubmitNavigateStack={WeeklyTopicRoutes.MAIN}
            placeholder='Write something...'
            minimized
          />
          <Space margin={10} />
          <Divider style={{ borderWidth: 0.6 }} />
          <Space margin={10} />
          <View style={styles.recording}>
            <Text bold>Session recording</Text>
            <Space />
            <Button style={styles.recordButton} disabled={!prevTopic.zoomAudioUrl} onPress={onListenSessionTap}>
              LISTEN TO SESSION
            </Button>
          </View>
          <Space margin={10} />
          <ArrowButton
            disabled={loadingPrevTopic || !prevTopic.animationUrl}
            color={
              !prevTopic.animationUrl
                ? theme.main.palette.other.onBoarding.button.accent
                : theme.main.palette.other.dailyActions.button.background
            }
            text={
              <Text>
                Intro Animation:{' '}
                <Text italic>{!prevTopic.animationUrl ? 'Not available yet.' : prevEvents[week].event_name}</Text>
              </Text>
            }
            onClick={to(Routes.PREV_ANIMATION, { animationUrl: prevTopic.animationUrl })}
          />
          <Space />
          <ArrowButton
            disabled={loadingPrevTopic || !prevTopic.handoutUrl}
            color={
              !prevTopic.handoutUrl
                ? theme.main.palette.other.onBoarding.button.accent
                : theme.main.palette.other.dailyActions.button.background
            }
            text={
              <Text>
                Handout:{' '}
                <Text italic>{!prevTopic.handoutUrl ? 'Not available yet.' : prevEvents[week].event_name}</Text>
              </Text>
            }
            onClick={to(Routes.HANDOUT, { handoutUrl: prevTopic.handoutUrl })}
          />
        </View>
      </ScrollView>
      <Picker
        ref={prevTopicsRef}
        selected={week}
        items={prevEvents.map((event, index) => ({ label: event.event_name as string, value: index }))}
        onDone={(selected) => onSelectWeek(selected as number)}
      />
    </>
  );
};
