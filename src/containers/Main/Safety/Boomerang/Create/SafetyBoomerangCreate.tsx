import { Modal, Pressable, ScrollView, View } from 'react-native';
import React, { createRef, useCallback, useState } from 'react';
import { useSafetyBoomerangCreateStyles } from './SafetyBoomerangCreate.styles';
import { Button, Card, Checkbox, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import { RadioButtons } from 'components/RadioButtons/RadioButtons';
import { SVG } from './assets';
import { Picker, PickerRef } from 'components/Picker/Picker';
import { useTheme } from 'providers/theme/ThemeProvider';
import { SafetyBoomerangCard } from 'containers/Main/Safety/Boomerang/Card/SafetyBoomerangCard';
import { Boomerang } from 'model/backend/safety';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackendClient } from 'service/backend-client.service';
import { F, Res, validateResponse } from 'model/backend';
import { SafetyBoomerangRoutes } from 'containers/Main/Safety/Boomerang/SafetyBoomerang.routes';
import { SchedulePicker } from 'components/SchedulePicker/SchedulePicker';
import { LINKS } from 'containers/Main/Safety/Boomerang/Card/SafetyBoomerangCard.links';
import { ModalWrapper } from 'components/Modal/Modal';
import { showAlertIfNetworkError } from 'providers/error.alert';

enum Timing {
  RANDOM,
  SCHEDULED,
}

enum Content {
  DEFAULT,
  CUSTOM,
}

interface Schedule {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  time: 'AM' | 'PM';
}

const ENCOURAGING = [
  'Make wise choices',
  "There's always a way to cope safely",
  'Courage, dear heart',
  'No feeling is final',
  'Recovery above all',
];

const LINKS_LABEL = LINKS.map((link) => link.label);

const GOALS = [
  'Today, abstinence',
  'Be patient with my kids',
  'Get exercise every day',
  "Notice what's good about me",
  'Breathe deeply',
];

const isNumber = (a: unknown) => typeof a === 'number';

export const SafetyBoomerangCreate: React.VFC = () => {
  const styles = useSafetyBoomerangCreateStyles();
  const theme = useTheme();
  const navigation = useNavigation();

  const [timing, setTiming] = useState(Timing.RANDOM);
  const [content, setContent] = useState(Content.DEFAULT);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleWeeklyRepeat, setScheduleWeeklyRepeat] = useState(true);

  const [encouragingReminder, setEncouragingReminder] = useState<number>();
  const encouragingReminderPickerRef = createRef<PickerRef>();

  const [link, setLink] = useState<number>();
  const linkPickerRef = createRef<PickerRef>();

  const [goal, setGoal] = useState<number>();
  const goalPickerRef = createRef<PickerRef>();

  useFocusEffect(
    useCallback(() => {
      setGoal(undefined);
      setLink(undefined);
      setEncouragingReminder(undefined);
    }, [])
  );

  const [message, setMessage] = useState<string>('');

  const [creating, setCreating] = useState<boolean>(false);

  const [showDone, setShowDone] = useState(false);

  const boomerangData: Partial<Boomerang> = {
    reminder: isNumber(encouragingReminder) ? ENCOURAGING[encouragingReminder as number] : undefined,
    goal: isNumber(goal) ? GOALS[goal as number] : undefined,
    link: isNumber(link) ? LINKS_LABEL[link as number] : undefined,
    message,
  };

  const boomerang: Partial<Boomerang> = {
    ...boomerangData,
    // @ts-ignore
    scheduled_event: timing === Timing.SCHEDULED ? { end_at: scheduleDate } : undefined,
  };

  const createBoomerang = () => {
    const data = {
      ...boomerangData,
      reminder: boomerangData.reminder || ENCOURAGING[0],
      goal: boomerangData.goal || GOALS[0],
      link: boomerangData.link || LINKS_LABEL[0],
      message: boomerangData.message,
      when: scheduleDate?.toISOString().replace('T', ' ').replace('Z', '+00:00'),
      is_when_random: timing === Timing.RANDOM,
      is_weekly: scheduleWeeklyRepeat,
      is_content_chosen: content === Content.CUSTOM,
    };
    BackendClient.post<Res<F<'boomerang', Boomerang>>>('/boomerang/create', data)
      .then(validateResponse)
      .then(() => setShowDone(true))
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn(err);
      })
      .finally(() => setCreating(false));
  };

  const closeModal = () => {
    setShowDone(false);
    navigation.navigate(SafetyBoomerangRoutes.MENU);
  };

  return (
    <View style={styles.root}>
      <Modal visible={showDone} animationType='slide' transparent={false}>
        <ModalWrapper
          styles={{ root: styles.modalRoot }}
          backgroundViewStyles={{ top: styles.modalTop, middle: styles.modalMiddle, bottom: styles.modalBottom }}
          onClose={() => closeModal()}>
          <Text center>Boomerang Message scheduled</Text>
          <Space margin={15} />
          <View style={styles.modalButtonContainer}>
            <Button horizontalButtonPadding={50} onPress={() => closeModal()}>
              OK
            </Button>
          </View>
          <Space />
        </ModalWrapper>
      </Modal>
      <ScrollView style={styles.scrollContainer}>
        <Space />
        <Text bold>How much surprise in your Safety Boomerang?</Text>
        <Space margin={8} />
        <Card>
          <Text bold>Timing:</Text>
          <Space margin={8} />
          <RadioButtons
            initial={timing}
            styles={{ radioButton: { marginVertical: 10 }, label: { marginLeft: 16 } }}
            items={[
              { label: 'Send me Safety Boomerangs\nat random times', value: Timing.RANDOM },
              { label: 'I want to schedule\nthe times in the form below', value: Timing.SCHEDULED },
            ]}
            onSelect={(newTiming) => {
              if (newTiming === 1) {
                setShowDatePicker(true);
              }
              setTiming(newTiming);
            }}
          />

          <Space margin={10} />

          <Text bold>Content:</Text>
          <Space margin={8} />
          <RadioButtons
            styles={{ radioButton: { marginVertical: 10 }, label: { marginLeft: 16 } }}
            initial={content}
            items={[
              { label: 'Let the app decide\nthe message content', value: Content.DEFAULT },
              { label: 'I want to write the content\non the form below', value: Content.CUSTOM },
            ]}
            onSelect={(newContent) => {
              setContent(newContent);
            }}
          />
        </Card>

        {timing === Timing.SCHEDULED && (
          <>
            <Space margin={15} />

            <Card>
              <Text center bold>
                Safety Boomerang Time
              </Text>
              <Space />

              <SchedulePicker autofocus={showDatePicker} onSelect={({ date }) => setScheduleDate(date)} />

              <Space margin={10} />
              <View style={styles.weeklyCheckBoxContainer}>
                <Checkbox
                  isChecked={scheduleWeeklyRepeat || false}
                  // bounceFriction={100000}
                  // size={25}
                  // iconStyle={styles.scheduleCheckBox}
                  onPress={(value) => setScheduleWeeklyRepeat(!!value)}
                />
                <Text>Repeat this message weekly</Text>
              </View>
            </Card>
          </>
        )}

        {content === Content.CUSTOM && (
          <>
            <Space margin={15} />

            <Card>
              <Text size={15} bold center>
                Safety Boomerang Custom Content
              </Text>
              <Space />
              <Text style={{ lineHeight: 24 }} size={15}>
                Build your Safety Boomerang using each dropdown below. The message you build will come back to you at
                the time selected.
              </Text>
              <Space />

              <Card>
                <Pressable style={styles.pickerOpener} onPress={() => encouragingReminderPickerRef.current?.open()}>
                  <Text bold={isNumber(encouragingReminder)}>
                    {isNumber(encouragingReminder)
                      ? ENCOURAGING[encouragingReminder as number]
                      : 'Select an encouraging reminder'}
                  </Text>
                  <SVG.Dropdown fill={theme.main.palette.primary} />
                </Pressable>
              </Card>

              <Space />

              <Card>
                <Pressable style={styles.pickerOpener} onPress={() => linkPickerRef.current?.open()}>
                  <Text bold={isNumber(link)}>{isNumber(link) ? LINKS_LABEL[link as number] : 'Select a link'}</Text>
                  <SVG.Dropdown fill={theme.main.palette.primary} />
                </Pressable>
              </Card>

              <Space />

              <Card>
                <Pressable style={styles.pickerOpener} onPress={() => goalPickerRef.current?.open()}>
                  <Text bold={isNumber(goal)}>{isNumber(goal) ? GOALS[goal as number] : 'Select a goal'}</Text>
                  <SVG.Dropdown fill={theme.main.palette.primary} />
                </Pressable>
              </Card>

              <Space margin={10} />

              <Text bold>Add Additional Information</Text>
              <TextInput
                onChangeText={(newMessage) => setMessage(newMessage)}
                style={styles.additionalTextInput}
                multiline
                placeholder='Write additional information...'
              />
            </Card>

            <Space />
          </>
        )}

        <Space margin={10} />
        <View style={styles.scheduleButtonContainer}>
          <Button loading={creating} onPress={() => createBoomerang()}>
            SCHEDULE MESSAGE
          </Button>
        </View>

        <Space margin={15} />
        {content === Content.CUSTOM && (
          <>
            <SafetyBoomerangCard boomerang={boomerang} onlyView />
            <Space margin={15} />
          </>
        )}
      </ScrollView>

      <Picker
        ref={encouragingReminderPickerRef}
        selected={encouragingReminder}
        items={ENCOURAGING.map((encouraging, index) => ({ label: encouraging, value: index }))}
        onDone={(selected) => typeof selected === 'number' && setEncouragingReminder(selected as number)}
      />

      <Picker
        ref={linkPickerRef}
        selected={link}
        items={LINKS_LABEL.map((linkTitle, index) => ({ label: linkTitle, value: index }))}
        onDone={(selected) => typeof selected === 'number' && setLink(selected as number)}
      />

      <Picker
        ref={goalPickerRef}
        selected={goal}
        items={GOALS.map((goalTitle, index) => ({ label: goalTitle, value: index }))}
        onDone={(selected) => typeof selected === 'number' && setGoal(selected as number)}
      />
    </View>
  );
};
