import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import React, { createRef, useCallback, useState } from 'react';
import { useTriggerPrepareAheadCopingMessageStyles } from './TriggerPrepareAheadCopingMessage.styles';
import { Button, Card, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import { SchedulePicker } from 'components/SchedulePicker/SchedulePicker';
import { Picker, PickerRef } from 'components/Picker/Picker';
import { SVG } from './assets';
import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { TriggerPrepEventCreate } from 'model/backend/trigger-prep.event';
import moment from 'moment';
import { TriggerPrepareAheadRoutes } from 'containers/Main/Trigger/PrepareAhead/TriggerPrepareAhead.routes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LINKS } from 'containers/Main/Safety/Boomerang/Card/SafetyBoomerangCard.links';
import { showAlertIfNetworkError } from 'providers/error.alert';

const LINKS_LABEL = LINKS.map((link) => link.label);

export const TriggerPrepareAheadCopingMessage: React.VFC = () => {
  const styles = useTriggerPrepareAheadCopingMessageStyles();
  const navigation = useNavigation();

  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [message, setMessage] = useState<string>();
  const [creating, setCreating] = useState(false);

  const [link, setLink] = useState<number>();
  const linkPickerRef = createRef<PickerRef>();

  useFocusEffect(useCallback(() => setLink(undefined), []));

  const createSchedule = () => {
    const data: TriggerPrepEventCreate = {
      app_action: typeof link === 'number' ? LINKS_LABEL[link] : undefined,
      message: message || '',
      when: moment(scheduleDate).utc().format('YYYY/MM/DD HH:mm:00 UTC'),
    };
    setCreating(true);
    BackendClient.post<Res>('/trigger_prep_event/create', data)
      .then(validateResponse)
      .then(() => navigation.navigate(TriggerPrepareAheadRoutes.MAIN))
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot schedule trigger prep event', err);
      })
      .finally(() => setCreating(false));
  };

  return (
    <View style={styles.main}>
      <ScrollView style={styles.root}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={140}>
            <>
              <Space margin={10} />
              <Card>
                <Text bold center>
                  Remind yourself of safety actions, on a future date
                </Text>
                <Space />
                <Text size={14} lineHeight={22}>
                  Set a date and choose an action by clicking the dropdowns below. The app will open that feature at the
                  time selected.
                </Text>
                <Space />

                <SchedulePicker autofocus onSelect={(data) => setScheduleDate(data.date)} />

                <Space margin={10} />

                <Pressable style={styles.linkSelector} onPress={() => linkPickerRef.current?.open()}>
                  <Text style={styles.linkSelectorText}>
                    {typeof link === 'number' ? LINKS_LABEL[link as number] : 'Select a link'}
                  </Text>
                  <SVG.ExpandMore width={25} height={25} fill={styles.dropdownSVG.color} />
                </Pressable>

                <Space margin={10} />

                <Text>Add a message to your future self here:</Text>
                <Space />
                <TextInput
                  style={styles.textInput}
                  multiline
                  placeholder='Write something...'
                  onChangeText={(t) => setMessage(t)}
                />
                <Space />
              </Card>

              <Space margin={10} />

              <View style={styles.buttonContainer}>
                <Button loading={creating} onPress={() => createSchedule()}>
                  SCHEDULE
                </Button>
              </View>
            </>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>

      <Picker
        ref={linkPickerRef}
        items={LINKS_LABEL.map((linkTitle, index) => ({ label: linkTitle, value: index }))}
        onDone={(selected) => typeof selected === 'number' && setLink(selected as number)}
      />
    </View>
  );
};
