import { Pressable, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useSafetyTalkToSelfCreateStyles } from './SafetyTalkToSelfCreate.styles';
import { Button, Card, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import { SVG } from './assets/index';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { BackendUpload } from 'service/backend-client.upload.service';
import { Res, validateResponse } from 'model/backend';
import { SafetyTalkToSelfRoutes } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf.routes';
import { useNavigation } from '@react-navigation/native';
import { BackendClient } from 'service/backend-client.service';

enum RecordStatus {
  NO_RECORD,
  RECORDING,
  RECORDED,
}

const NEXT_STATE = {
  [RecordStatus.NO_RECORD]: RecordStatus.RECORDING,
  [RecordStatus.RECORDING]: RecordStatus.RECORDED,
  [RecordStatus.RECORDED]: RecordStatus.RECORDING,
};

const Recorder = new AudioRecorderPlayer();

const MAX_RECORD_SEC = 30;

const QUESTIONS = [
  [
    'What hopeful messages can your Safe Self tell your Unsafe Self?',
    'For example, "Hey, I know you\'re feeling down but I guarantee things can get better..."',
    'Talk as long as you want. Make it strong.',
  ],
  [
    'Think of people you trust. What would they say to help your Unsafe Self get back to safety? If you want, get some of those people to record or type their answers here.',
  ],
  [
    'Describe a time that you were healthy and doing well. Really picture it. What does your Unsafe Self need to do to get back to that Safe Self?',
  ],
];

const QUESTION_LABEL = ['a', 'b', 'c'];

interface SafeSelfQuestionData {
  uri: string;
  name: string;
  filename: string;
}

export const SafetyTalkToSelfCreate: React.VFC = () => {
  const styles = useSafetyTalkToSelfCreateStyles();
  const navigation = useNavigation();

  const [recordState, setRecordState] = useState<RecordStatus>(RecordStatus.NO_RECORD);
  const [playing, setPlaying] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [actualRecording, setActualRecording] = useState<string>();
  const [finalMessage, setFinalMessage] = useState<string[]>([]);
  const [actualMessage, setActualMessage] = useState<string>();
  const [actualQuestionIdx, setActualQuestionIdx] = useState<number>(0);

  const [selfData, setSelfData] = useState<SafeSelfQuestionData[]>([]);

  const actualQuestion = QUESTIONS[actualQuestionIdx];

  const [uploading, setUploading] = useState<boolean>(false);

  const startStopRecord = async (actualState: RecordStatus = recordState) => {
    try {
      setRecordingTime(0);
      const nextState = NEXT_STATE[actualState];
      if (nextState === RecordStatus.RECORDING) {
        if (playing) {
          await startStopPlay();
        }
        await Recorder.startRecorder();
        Recorder.addRecordBackListener((e) => {
          const actualSec = Math.round(e.currentPosition / 1000);
          setRecordingTime(actualSec);
          if (actualSec > MAX_RECORD_SEC) {
            startStopRecord(nextState);
          }
          return;
        });
      }
      if (nextState === RecordStatus.RECORDED) {
        const uri = await Recorder.stopRecorder();
        setActualRecording(uri);
        Recorder.removeRecordBackListener();
      }
      setRecordState(nextState);
    } catch (error) {
      console.error(error);
    }
  };

  const startStopPlay = async (isPlaying: boolean = playing) => {
    if (!isPlaying) {
      await Recorder.startPlayer();
      Recorder.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          startStopPlay(true);
        }
      });
    } else {
      await Recorder.stopPlayer();
      Recorder.removePlayBackListener();
    }
    setPlaying(!isPlaying);
  };

  const isLastQuestion = actualQuestionIdx === QUESTIONS.length - 1;

  const nextQuestion = async () => {
    let recordings = [...selfData];
    Recorder.stopPlayer().catch((err) => console.warn('Cannot stop recording player', err));
    setUploading(true);
    setFinalMessage((a) => [...a, actualMessage || '']);
    if (typeof actualRecording === 'string') {
      const name = `audio_${QUESTION_LABEL[actualQuestionIdx]}`;
      const filename = `${name}.m4a`;
      const uri = `${RNFS.TemporaryDirectoryPath}${filename}`;
      if (await RNFS.exists(uri)) {
        await RNFS.unlink(uri);
      }
      await RNFS.copyFile(actualRecording, uri);
      recordings = [...selfData, { name, filename, uri }];
    }
    if (isLastQuestion) {
      const files: RNFS.UploadFileItem[] = recordings.map((record) => ({
        filename: record.filename,
        filepath: record.uri,
        filetype: 'audio/m4a',
        name: record.name,
      }));
      const text = [...finalMessage, actualMessage || ''].filter(Boolean).join('. ');
      const fields = { text };
      // const fields = actualMessage ? { text } : undefined;
      console.debug('sending files for uploading', files);
      console.debug('sending files for fields', fields);
      if (files && files.length > 0) {
        // if we have files, send it using the put files method. This was due to an error on Android that the empty array didn't work an throws errors
        try {
          await BackendUpload.putFiles<Res>('/safe_self', files, fields).then(validateResponse);
        } catch (err) {
          console.warn('Cannot upload records', err);
        }
      } else {
        console.debug('sending multipart form data from axios', text);
        try {
          // otherwise send it as a simple form data
          const data = new FormData();
          data.append('text', text);
          await BackendClient.put('/safe_self', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(
            validateResponse
          );
        } catch (e) {
          console.warn(e);
        }
      }
      navigation.navigate(SafetyTalkToSelfRoutes.MENU);
      setActualMessage(undefined);
      setFinalMessage([]);
      setUploading(false);
      return;
    }
    setUploading(false);
    setSelfData([...recordings]);
    setActualRecording(undefined);
    setActualMessage(undefined);
    setRecordState(RecordStatus.NO_RECORD);
    setActualQuestionIdx(actualQuestionIdx + 1);
  };

  return (
    <ScrollView style={styles.root}>
      <Card>
        <Text center>Question {actualQuestionIdx + 1}</Text>
        <Space />
        {actualQuestion.map((text, index) => (
          <View style={styles.questionText} key={index}>
            <Text center bold>
              {text}
            </Text>
            <Space />
          </View>
        ))}
      </Card>
      <Space margin={10} />
      <Text bold>Record your voice</Text>
      <Space margin={10} />
      <Card>
        <Text center bold>
          Record Audio
        </Text>
        <Space />
        <View style={styles.recordButtonContainer}>
          <Pressable style={styles.recordButton} onPress={() => startStopRecord()}>
            {recordState !== RecordStatus.RECORDING && <SVG.Mic fill='white' width={40} height={40} />}
            {recordState === RecordStatus.RECORDING && <SVG.Pause fill='white' width={40} height={40} />}
          </Pressable>
          {recordState === RecordStatus.RECORDED && (
            <>
              <Space horizontal margin={10} />
              <Pressable style={styles.recordButton} onPress={() => startStopPlay()}>
                {!playing && <SVG.Play fill='white' width={40} height={40} />}
                {playing && <SVG.Pause fill='white' width={40} height={40} />}
              </Pressable>
            </>
          )}
        </View>
        {recordState === RecordStatus.RECORDING && (
          <>
            <Space />
            <View style={styles.statusRecordingContainer}>
              <View style={styles.recContainer}>
                <View style={styles.recIconContainer}>
                  <View style={styles.recIconInner} />
                </View>
                <Space horizontal />
                <Text bold style={styles.recText}>
                  REC
                </Text>
              </View>
              <View style={styles.recTimeContainer}>
                <Text style={styles.recText}>0:{`${recordingTime}`.padStart(2, '0')}</Text>
                <Space horizontal margin={2} />
                <Text style={styles.recText}>/</Text>
                <Space horizontal margin={2} />
                <Text style={styles.recText}>0:{MAX_RECORD_SEC}</Text>
              </View>
            </View>
          </>
        )}
      </Card>
      <Space margin={10} />
      <Text bold>Prefer to write?</Text>
      <Space margin={10} />
      <Card style={styles.textInputContainer}>
        <TextInput
          value={actualMessage}
          onChangeText={(text) => setActualMessage(text)}
          style={styles.textInput}
          placeholder='Write something...'
          multiline
        />
      </Card>
      <Space margin={10} />
      <View style={styles.nextContainer}>
        <Button disabled={recordState === RecordStatus.RECORDING} loading={uploading} onPress={() => nextQuestion()}>
          {isLastQuestion ? 'SAVE AND CONTINUE' : 'NEXT'}
        </Button>
      </View>
    </ScrollView>
  );
};
