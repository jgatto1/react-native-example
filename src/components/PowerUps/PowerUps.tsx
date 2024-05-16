import { SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { usePowerUpsStyles } from './PowerUps.styles';
import { Button, Card, Space, Text } from 'components';
import { Res, validateResponse } from 'model/backend';
import Assets from './assets';
import { useNavigation } from '@react-navigation/native';
import { useDailyActionQuestionContext } from '../../containers/Main/Home/DailyActions/Question/context/DailyActionQuestion.context';
import { BackendClient } from 'service/backend-client.service';
import { PowerUpType } from 'model/backend/quiz';
import { useWeeklyPowerUpsContext } from '../../containers/Main/Home/WeeklyTopic/WeeklyPowerUps/WeeklyPowerUps.context';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { WeeklyTopicRoutes } from 'containers/Main/Home/WeeklyTopic/WeeklyTopic.stack.routes';

const NO_MORE = "It looks like you've responded to all of your current Quests. Check back later for more!";

interface RespondData {
  tried: boolean;
  notInterested: boolean;
}

export const PowerUps: React.VFC<{ powerUpType: PowerUpType }> = ({ powerUpType }: { powerUpType: PowerUpType }) => {
  const styles = usePowerUpsStyles();
  const navigation = useNavigation();
  const isWeeklyContext = powerUpType === PowerUpType.POWER_UP;
  const context = isWeeklyContext ? useWeeklyPowerUpsContext : useDailyActionQuestionContext;
  const { powerUp, noMore, refresh } = context();
  const [updating, setUpdating] = useState(false);

  const navRoute = isWeeklyContext ? WeeklyTopicRoutes.MODAL : DailyActionsRoutes.MODAL_QUESTION;

  const remindMe = () => {
    setUpdating(true);
    BackendClient.put<Res>(`/power_up/${powerUp?.id}/remind_me`)
      .then(validateResponse)
      .then(() => {
        navigation.navigate(
          navRoute,
          isWeeklyContext
            ? { title: 'YES!', content: 'You will be reminded in 3 hours' }
            : {
                reminder: true,
              }
        );
      })
      .catch((err) => console.warn(err))
      .finally(() => setUpdating(false));
  };

  const respond: (data: RespondData) => Promise<Res | void> = ({ tried, notInterested }) => {
    setUpdating(true);
    const data = {
      has_tried_it: tried,
      is_not_interested: notInterested,
    };
    // return mockOkReq()
    return BackendClient.put<Res>(`power_up/${powerUp?.id}/respond`, data)
      .then(validateResponse)
      .catch((err) => {
        console.warn('Cannot skip power up', err);
      })
      .finally(() => {
        setUpdating(false);
        refresh && refresh();
      });
  };

  const skip = () =>
    respond({
      tried: false,
      notInterested: true,
    }).then(() => navigation.navigate(isWeeklyContext ? WeeklyTopicRoutes.MENU : DailyActionsRoutes.MENU));

  const tried = () =>
    respond({
      tried: true,
      notInterested: false,
    }).then(() => navigation.navigate(navRoute, isWeeklyContext ? { content: 'Power up activity is completed' } : {}));

  return (
    <View style={styles.root}>
      <Space margin={10} />
      <SafeAreaView style={styles.safeRoot}>
        <Text size={24} fontStyle='italic' style={styles.title}>
          {powerUp?.text_one || (noMore ? `No ${isWeeklyContext ? 'Power Ups' : 'Quests'} available.` : 'Loading...')}
        </Text>
        <Text size={16} style={styles.description}>
          {powerUp?.text_two || (noMore ? NO_MORE : 'Loading...')}
        </Text>
        {!noMore && (
          <Card style={styles.card}>
            {isWeeklyContext && (
              <Text style={{ margin: 8, marginBottom: 18 }} bold>
                Did you do this Power Up?
              </Text>
            )}
            <Button
              icon={<Assets.Check width={20} height={20} style={styles.buttonIcon} />}
              disabled={!powerUp || updating}
              style={styles.button}
              onPress={tried}>
              {isWeeklyContext ? 'I DID IT' : 'I THOUGHT ABOUT IT'}
            </Button>
            {isWeeklyContext && <Space margin={2} />}
            <Button
              icon={<Assets.Clock style={styles.buttonIcon} />}
              disabled={!powerUp || updating}
              style={[styles.button, styles.middleButton]}
              onPress={() => remindMe()}>
              REMIND ME LATER
            </Button>
            {isWeeklyContext && <Space margin={2} />}
            <Button
              icon={<Assets.Skip style={styles.buttonIcon} />}
              disabled={!powerUp || updating}
              style={styles.button}
              onPress={skip}>
              SKIP
            </Button>
            {isWeeklyContext && <Space margin={4} />}
          </Card>
        )}
      </SafeAreaView>
    </View>
  );
};
