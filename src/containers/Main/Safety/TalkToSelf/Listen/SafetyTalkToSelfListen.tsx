import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafetyTalkToSelfListenStyles } from './SafetyTalkToSelfListen.styles';
import { Card, NewPost, Text } from 'components';
import { SafeSelf, SafeSelfRes } from 'model/backend/safe-self';
import { validateResponse } from 'model/backend';
import { SVG } from './assets';
import { Space } from 'components/Space/Space';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Slider } from '@miblanchard/react-native-slider';
import { useTheme } from 'providers/theme/ThemeProvider';
import { BackendClient } from 'service/backend-client.service';
import { SafetyTalkToSelfRoutes } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf.routes';

const Recorder = new AudioRecorderPlayer();

const humanize = (elapsed: number) => {
  const dividedSeconds = elapsed / 1000 / 60;
  const minutes = `${Math.floor(dividedSeconds)}`;
  const seconds = `${Math.round(60 * (dividedSeconds - Math.floor(dividedSeconds)))}`;
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

export const SafetyTalkToSelfListen: React.VFC = () => {
  const styles = useSafetyTalkToSelfListenStyles();
  const theme = useTheme();

  const [safeSelf, setSafeSelf] = useState<SafeSelf>();
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);

  const [playPos, setPlayPos] = useState<number>(0);

  const [duration, setDuration] = useState<number>();

  useEffect(() => {
    BackendClient.get<SafeSelfRes>('/safe_self')
      .then(validateResponse)
      .then((data) => setSafeSelf(data.safe_self))
      .catch((err) => console.warn('Cannot load safe self', err))
      .finally(() => setLoading(false));

    return () => {
      Recorder.stopPlayer().catch((err) => console.warn('Cannot stop player', err));
    };
  }, []);

  const startStopPlay = async () => {
    try {
      if (!playing && !!safeSelf?.audio_url) {
        await Recorder.startPlayer(safeSelf.audio_url);
        setPlayPos(0);
        Recorder.addPlayBackListener((e) => {
          if (typeof duration !== 'number') {
            setDuration(e.duration);
          }
          setPlayPos(Math.round((e.currentPosition / e.duration) * 100));
          if (e.currentPosition >= e.duration) {
            setPlaying(false);
          }
        });
        setPlaying(true);
      }
      if (playing) {
        await Recorder.stopPlayer();
        Recorder.removePlayBackListener();
        setPlaying(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const seekPlay = async (secondsPercentage: number) => {
    if (typeof duration !== 'number') {
      return;
    }
    if (playing) {
      await Recorder.seekToPlayer((secondsPercentage / 100) * duration);
    }
  };

  const reproducedTime = !!duration && playPos > 0 ? Math.floor(duration * (playPos / 100)) : -1;

  const reproduced = reproducedTime === -1 ? '' : humanize(reproducedTime);
  const remain = reproducedTime === -1 || !duration ? '' : `-${humanize(duration - reproducedTime)}`;

  return (
    <ScrollView style={styles.root}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'android' ? 150 : 80}>
        <Space margin={20} />
        <Card>
          {loading && <ActivityIndicator color='grey' />}
          {!loading && (
            <View style={styles.playerContainer}>
              <Pressable style={styles.controlButton} onPress={() => startStopPlay()}>
                {!playing && <SVG.Play fill='white' width={50} height={50} />}
                {playing && <SVG.Pause fill='white' width={50} height={50} />}
              </Pressable>

              <Space />

              <View style={styles.trackerContainer}>
                <Slider
                  containerStyle={styles.sliderContainer}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={playPos}
                  onValueChange={([newValue]) => seekPlay(newValue)}
                  // trackStyle={styles.sliderTrack}
                  thumbTintColor={theme.main.palette.primary}
                  thumbStyle={{ height: 15, width: 15 }}
                  minimumTrackTintColor={theme.main.palette.primary}
                  maximumTrackTintColor={'grey'}
                />
                <View style={styles.timerContainer}>
                  <Text>{reproduced}</Text>
                  <Text>{remain}</Text>
                </View>
              </View>

              <Space />

              {!!safeSelf?.text && <Text center>{safeSelf?.text}</Text>}
            </View>
          )}
        </Card>
        <Space />
        <NewPost
          minimized
          placeholder={'Write something...'}
          // styleContainer={styles.newPost}
          title={'Reflect on your Safe Self'}
          onSubmitNavigateRoute={SafetyTalkToSelfRoutes.MENU}
        />
        <Space />
        <Space />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
