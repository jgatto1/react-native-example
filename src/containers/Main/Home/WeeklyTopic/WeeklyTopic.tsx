import { ActivityIndicator, Platform, ScrollView, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useWeeklyTopicStyles } from './WeeklyTopic.styles';
import { ArrowButton } from 'components/ArrowButton/ArrowButton';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { WeeklyTopicRoutes as Routes } from './WeeklyTopic.stack.routes';
import { useCohortTopic } from '../CohortTopic.context';
import { useTheme } from 'providers/theme/ThemeProvider';
import { useZoomContext } from './NextSession/ZoomMeeting.context';
import moment from 'moment';
import { Res, validateResponse } from 'model/backend';
// @ts-ignore
import Video from 'react-native-video-controls';
import { BackendClient } from 'service/backend-client.service';
import { Animations } from 'model/backend/animation';
import { useCommitmentContext } from './Commitment/Commitment.context';
import { Text } from 'components';
import axios from 'axios';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { useDailyActionQuiz } from 'containers/Main/Home/DailyActions/Quiz/context/DailyActionQuiz.context';

const NEXT_SESSION = 'Next Session: ';
const LEAVE_FEEDBACK = 'Leave feedback: ';
const JOIN_CALL = 'Join call: ';
const NOT_AVAILABLE = 'Not available yet.';

export const WeeklyTopic: React.VFC = () => {
  const [animationUrl, setAnimationUrl] = useState('');
  const [errorLoadingVideo, setErrorLoadingVideo] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const playerRef = useRef<Video>(null);
  const theme = useTheme();
  const styles = useWeeklyTopicStyles();
  const zoomData = useZoomContext();
  const { commitmentData } = useCommitmentContext();
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // hot fix https://github.com/react-native-video/react-native-video/issues/1989#issuecomment-688397232
  const { currentEvent, loading } = useCohortTopic();
  const quiz = useDailyActionQuiz();
  // const { currentEvent, prevEvents, loading } = useCohortTopic();

  const getNextSessionLabel = () => {
    if (!zoomData.meetingId) {
      return (
        <Text>
          {NEXT_SESSION}
          <Text italic>{NOT_AVAILABLE}</Text>
        </Text>
      );
    }
    const now = moment();
    const startAt = zoomData.meetingStartTime as number;
    const endAt = zoomData.meetingEndTime as number;
    const startInFiveMinOrLess = moment(startAt).diff(now) <= 5;

    if (startInFiveMinOrLess) {
      return now.valueOf() < endAt ? (
        <Text>
          {JOIN_CALL} <Text italic>{currentEvent.topic.name}</Text>
        </Text>
      ) : (
        <Text>
          {LEAVE_FEEDBACK} <Text italic>{currentEvent.topic.name}</Text>
        </Text>
      );
    }
    return NEXT_SESSION + moment(startAt).format('ddd, M/D/YY, h:mm A');
  };

  const nextSessionLabel = currentEvent.noEvent ? (
    <Text>
      {NEXT_SESSION}
      <Text italic>{NOT_AVAILABLE}</Text>
    </Text>
  ) : (
    getNextSessionLabel()
  );

  const to = (route: Routes | DailyActionsRoutes, params?: { [key: string]: any }) => () => {
    navigation.navigate(route, params);
  };

  const onlyIfTopic = (callback: () => void) => () => {
    if (currentEvent.noEvent) {
      return;
    }
    callback();
  };

  useEffect(() => {
    if (currentEvent.topic.id) {
      setLoadingVideo(true);
      BackendClient.get<Res<Animations>>(`/animations?topic_id=${currentEvent.topic.id}`)
        .then(validateResponse)
        .then(({ animations }) => {
          BackendClient.get<Res<{ url: string }>>(`/animation/${animations[0].uuid}/url`)
            .then(validateResponse)
            .then(async (res) => {
              console.log('Animation url', res.url);
              const videoIsOk = await axios
                .get(res.url, { headers: { ...BackendClient.defaults.headers.common } })
                .then(() => true)
                .catch((err) => {
                  console.warn('Error to fetch video res.url', err);
                });
              if (videoIsOk) {
                setAnimationUrl(res.url);
              }
            });
        })
        .catch((err) => {
          console.info('Cannot fetch animation for current event', err);
          setErrorLoadingVideo(true);
        })
        .finally(() =>
          setTimeout(() => {
            setLoadingVideo(false);
          }, 1200)
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, loading]);

  if (!isFocused) {
    return null;
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.mainContainer}>
        <View style={styles.videoPlayerContainer}>
          {!errorLoadingVideo ? (
            <>
              {loadingVideo && (
                <View style={styles.noVideo}>
                  <ActivityIndicator style={styles.loadingIndicator} color={'orange'} size='large' />
                </View>
              )}
              {isFocused && !!animationUrl && (
                <Video
                  ref={playerRef}
                  playInBackground={false}
                  resizeMode={'contain'}
                  muted={Platform.OS === 'ios'}
                  paused={true}
                  disableVolume
                  disableBack
                  disableFullscreen
                  style={styles.videoPlayer}
                  source={{ uri: animationUrl, headers: { ...BackendClient.defaults.headers.common } }}
                  onError={(error: any) => {
                    setErrorLoadingVideo(true);
                    console.warn(error);
                  }}
                  onLoad={() => {
                    playerRef.current?.player?.ref?.seek(1);
                  }}
                />
              )}
            </>
          ) : (
            <View style={styles.noVideo}>
              <Text>No Current Topic Animation.</Text>
            </View>
          )}
        </View>
        <View style={styles.actionsContainer}>
          <ArrowButton
            rootStyles={{ marginBottom: 8 }}
            color={theme.main.palette.other.weeklyTopic.background}
            disabled={loading}
            text={
              <Text>
                Handout: <Text italic>{currentEvent.topic.name}</Text>
              </Text>
            }
            onClick={onlyIfTopic(to(Routes.HANDOUT, { handoutUrl: currentEvent.topic.handout_url }))}
          />
          <ArrowButton
            rootStyles={{ marginBottom: 8 }}
            color={
              !zoomData.meetingId || currentEvent.noEvent
                ? theme.main.palette.other.dailyActions.button.background
                : theme.main.palette.accent
            }
            disabled={loading}
            text={nextSessionLabel}
            onClick={
              currentEvent.noEvent || zoomData.loading || !zoomData.meetingId ? () => null : to(Routes.NEXT_SESSION)
            }
          />
          <ArrowButton
            rootStyles={{ marginBottom: 8 }}
            color={theme.main.palette.other.weeklyTopic.background}
            disabled={loading}
            text={
              <Text>
                Your commitment:{' '}
                <Text italic>{!commitmentData.is_completed ? currentEvent.topic.name : 'COMPLETED'}</Text>
              </Text>
            }
            onClick={onlyIfTopic(to(Routes.COMMITMENT))}
          />

          <ArrowButton
            rootStyles={{ marginBottom: 8 }}
            disabled={loading}
            text={
              <Text>
                Weekly Quiz: <Text italic>{currentEvent?.topic.name}</Text>
              </Text>
            }
            onClick={to(quiz.completed ? DailyActionsRoutes.MODAL_QUIZ_CONGRATS : DailyActionsRoutes.QUIZ)}
          />

          <ArrowButton
            rootStyles={{ marginBottom: 8 }}
            color={theme.main.palette.other.weeklyTopic.background}
            disabled={loading}
            text={
              <Text>
                Power Up: <Text italic>{currentEvent.topic.name}</Text>
              </Text>
            }
            onClick={onlyIfTopic(to(Routes.POWER_UP))}
          />
          {/* <ArrowButton
            rootStyles={{ marginBottom: 8 }}
            color={theme.main.palette.other.weeklyTopic.background}
            disabled={loading}
            text={
              <Text>
                Previous Session: <Text italic>{prevEvents[prevEvents.length - 1].event_name}</Text>
              </Text>
            }
            onClick={() => {
              if (prevEvents[prevEvents.length - 1].event_name === 'No Previous Topics.') {
                return;
              }
              navigation.navigate(Routes.PREVIOUS_SESSION);
            }}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};
