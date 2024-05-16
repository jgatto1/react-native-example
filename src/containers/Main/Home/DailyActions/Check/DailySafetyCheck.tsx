import { ActivityIndicator, Linking, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useDailySafetyCheckStyles } from './DailySafetyCheck.styles';
import { Button, Card, Checkbox, customHeaderOptions, Text } from 'components';
import { SliderCard } from './SliderCard/SliderCard';
import { TextInput } from 'components/TextInput/TextInput';
import { Res, validateResponse } from 'model/backend';
import { useSession } from 'providers/session/SessionProvider';
import { useNavigation } from '@react-navigation/native';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { BackendClient } from 'service/backend-client.service';
import { useTheme } from 'providers/theme/ThemeProvider';
import { DAILY_SAFETY_POPUP_CONFIG } from '../DailyActions.stack';
import { showAlertIfNetworkError } from 'providers/error.alert';

interface SelectorCard {
  key: string;
  title: string;
  value: number;
}

interface TodoNextCheck {
  title: string;
  checked: boolean;
  route: string;
}

const INITIAL_CARDS: SelectorCard[] = [
  { key: 'substance_use', title: 'Substance use', value: 0 },
  { key: 'self_harm', title: 'Harm to self', value: 0 },
  { key: 'other_harm', title: 'Harm to others', value: 0 },
  { key: 'unsafe_behavior', title: 'Other unsafe behavior', value: 0 },
];

const NEXT_STEP_CHECK: TodoNextCheck[] = [
  { title: 'Go to Safety Reflections', checked: false, route: DailyActionsRoutes.REFLECTION },
  { title: 'Contact Trusted People', checked: false, route: DailyActionsRoutes.TRUSTED_PEOPLE },
  { title: 'Log a Trigger', checked: false, route: DailyActionsRoutes.LOG },
  { title: 'See emergency numbers', checked: false, route: DailyActionsRoutes.LEARN_URGENT_RESOURCES },
  { title: 'Use blood alcohol calculator', checked: false, route: 'https://www.calculator.net/bac-calculator.html' },
  { title: 'Make coach appointment', checked: false, route: DailyActionsRoutes.COPING_COACH },
  { title: 'Reach out to your group', checked: false, route: DailyActionsRoutes.MESSAGES },
];

enum Status {
  FORM,
  NEXT_STEPS,
  CHECK_IN,
}

const STATUS_BUTTON = {
  [Status.FORM]: 'LOG IT',
  [Status.NEXT_STEPS]: 'NEXT',
  [Status.CHECK_IN]: 'DONE',
};

export const DailySafetyCheck: React.VFC = (props: any) => {
  const { route } = props;
  const theme = useTheme();
  const styles = useDailySafetyCheckStyles();
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [checks, setChecks] = useState(NEXT_STEP_CHECK);
  const [status, setStatus] = useState(Status.FORM);
  const [loggingIt, setLoggingIt] = useState(false);
  const session = useSession();
  const navigation = useNavigation();

  const cardUpdater = (card: SelectorCard) => (value: number) => {
    card.value = value;
    setCards(cards);
  };

  const onCheck = (aCheck: TodoNextCheck) => (isChecked?: boolean | undefined) => {
    aCheck.checked = !!isChecked;
    setChecks(checks);
  };

  const doCheckIn = () => {
    setLoggingIt(true);
    const params = { user_uuid: session.userUUID };
    const data = {
      ...cards.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}),
      substance_use_text: '',
      self_harm_text: '',
      other_harm_text: '',
      unsafe_behavior_text: '',
    };
    BackendClient.post<Res>('/safety_check/create', data, { params })
      .then(validateResponse)
      .then(() => {
        navigation.navigate(DailyActionsRoutes.MENU);
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot Log It data', err);
      })
      .finally(() => setLoggingIt(false));
  };

  const nextStatus = () => {
    console.log('nextStatus', status);
    switch (status) {
      case Status.FORM:
        if (cards.some(({ value }) => value > 0)) {
          navigation.setOptions(customHeaderOptions(route, navigation, theme, 'Daily Safety Check - next steps'));
          setStatus(Status.NEXT_STEPS);
        }
        break;
      case Status.NEXT_STEPS:
        navigation.setOptions(customHeaderOptions(route, navigation, theme, 'Safety Check In'));
        setStatus(Status.CHECK_IN);
        break;
      case Status.CHECK_IN:
        console.log('do checkin');

        doCheckIn();
        break;
    }
  };

  const onCancel = () => {
    switch (status) {
      case Status.FORM:
        navigation.goBack();
        break;
      case Status.NEXT_STEPS:
        setStatus(Status.FORM);
        navigation.setOptions(
          customHeaderOptions(route, navigation, theme, 'Daily Safety Check', DAILY_SAFETY_POPUP_CONFIG)
        );
        break;
      case Status.CHECK_IN:
        setStatus(Status.NEXT_STEPS);
        navigation.setOptions(customHeaderOptions(route, navigation, theme, 'Daily Safety Check - next steps'));
        break;
    }
  };

  const [postText, setPostText] = useState<string>();
  const [posting, setPosting] = useState(false);

  const doPost = ({ isPublic }: { isPublic: boolean }) => {
    if (!postText) {
      return;
    }
    const postData = {
      origin: 'Daily Safety Check',
      resource_data: postText,
      is_public: isPublic ? 'true' : 'false',
    };
    setPosting(true);
    BackendClient.post<Res>('/msp_post/create', postData)
      .then(validateResponse)
      .then(() => navigation.goBack())
      .catch((err) => {
        console.error('Cannot do post on Daily Safety check', err);
        showAlertIfNetworkError(err);
      })
      .finally(() => setPosting(false));
  };

  const canPost = !!postText && postText.length > 2;

  const title =
    status === Status.FORM
      ? 'Any unsafe behavior in the past 24 hours?'
      : status === Status.NEXT_STEPS
      ? `You've logged ${cards
          .filter((card) => card.value > 0)
          .map((card) => card.title)
          .join(', ')}`
      : "These buttons will take you to the areas you've selected";

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{title}</Text>

        {status === Status.FORM &&
          cards.map((card, index) => (
            <SliderCard key={index} title={card.title} value={card.value} onChange={cardUpdater(card)} />
          ))}

        {status === Status.NEXT_STEPS && (
          <Card style={styles.nextStepCard}>
            <View style={styles.nextStepCardTitleContainer}>
              <Text style={styles.nextStepCardTitle}>What would you like to do next</Text>
              <Text>Tap all that apply</Text>
            </View>
            <View style={styles.checksContainer}>
              {checks.map((check, index) => (
                <View key={index} style={styles.checkContainer}>
                  <Checkbox isChecked={check.checked} onPress={onCheck(check)} />
                  <Text style={styles.checkText}>{check.title}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {status === Status.CHECK_IN && (
          <Card style={styles.nextStepCard}>
            <View style={styles.nextStepCardTitleContainer}>
              <Text style={styles.nextStepCardTitle}>Tap the one you want to go to first</Text>
              {checks
                .filter(({ checked }) => checked)
                .map((check, index) => (
                  <Button
                    key={index}
                    onPress={() => {
                      if (check.route.startsWith('https')) {
                        Linking.openURL(check.route).catch(console.warn);
                      } else {
                        navigation.navigate(check.route);
                      }
                    }}
                    style={styles.checkedTodoButton}
                    textStyle={styles.checkedTodoButtonText}>
                    {check.title.toUpperCase()}
                  </Button>
                ))}
            </View>
          </Card>
        )}

        <View style={styles.buttonContainer}>
          <Button style={styles.cancel} textStyle={styles.cancelText} onPress={() => onCancel()}>
            CANCEL
          </Button>
          <Button style={styles.logIt} disabled={loggingIt} onPress={() => nextStatus()}>
            {!loggingIt && STATUS_BUTTON[status]}
            {loggingIt && <ActivityIndicator size={1} style={styles.logItIndicator} color='grey' />}
          </Button>
        </View>
        {status === Status.CHECK_IN && (
          <Card style={styles.noteCard}>
            <View style={styles.nextStepCardTitleContainer}>
              <Text style={styles.nextStepCardTitle}>Any notes about your Safety Check today?</Text>
            </View>
            <TextInput
              value={postText}
              onChangeText={(t) => setPostText(t)}
              multiline={true}
              placeholder={'Write something...'}
              style={styles.noteTextInput}
            />
            <View style={styles.noteButtons}>
              <Button
                disabled={posting || !canPost}
                style={styles.noteButton}
                textStyle={styles.noteButtonText}
                onPress={() => doPost({ isPublic: false })}>
                FOR YOU
              </Button>
              <Button
                disabled={posting || !canPost}
                style={styles.noteButton}
                textStyle={styles.noteButtonText}
                onPress={() => doPost({ isPublic: true })}>
                SHARE
              </Button>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
