import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import { useTriggerStyles } from './Trigger.styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Space } from 'components/Space/Space';
import { ArrowButton } from 'components/ArrowButton/ArrowButton';
import { TriggerRoutes } from 'containers/Main/Trigger/Trigger.routes';
import { Text } from 'components';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';
import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { LearnRoutesStatic } from 'containers/Main/Learn/Learn.routes';
import { HomeRoutes } from 'containers/Main/Home/Home.stack.routes';
import { useBackContext } from 'components/CustomHeader/CustomHeader';
import { MainTabRoutes } from 'containers/Main/MainTabRoutes';

const BUTTONS = [
  { route: TriggerRoutes.PREPARE_AHEAD, text: 'Prepare ahead' },
  { route: TriggerRoutes.TRUSTED_PEOPLE, text: 'Message Trusted People' },
  { route: MainTabRoutes.REACH_OUT, text: 'Reach Out For Support' },
  { route: MainTabRoutes.SAFETY, text: 'Explore Safety' },
  { route: TriggerRoutes.DAILY_ACTIONS, text: 'Try the Daily Actions' },
  { route: TriggerRoutes.WEEKLY_TOPIC, text: 'Visit the Weekly Topic' },
  { route: LearnRoutesStatic.URGENT_RESOURCES, text: 'Call Crisis Resources' },
];

export const Trigger: React.VFC = () => {
  const styles = useTriggerStyles();
  const navigation = useNavigation();
  const actualRoute = useRoute();
  const back = useBackContext();
  const to = (route: TriggerRoutes | ReachOutRoutes | SafetyRoutes | DailyActionsRoutes | string) => () => {
    if (
      route === HomeRoutes.DAILY_ACTIONS ||
      route === HomeRoutes.WEEKLY_TOPIC ||
      route === ReachOutRoutes.TRUSTED_PEOPLE
    ) {
      back.set(TriggerRoutes.MENU, MainTabRoutes.TRIGGER);
    }
    navigation.navigate(route, { backRoute: actualRoute.name, backStack: MainTabRoutes.TRIGGER });
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Space />
        <Image style={styles.image} source={require('./assets/TriggerIllustration.png')} />

        <View>
          <Space margin={10} />
          <ArrowButton
            color={styles.logButton.color}
            textColor='black'
            text={<Text size={18}>LOG A TRIGGER</Text>}
            onClick={to(TriggerRoutes.LOG)}
          />
        </View>

        {BUTTONS.map(({ route, text }, index) => (
          <View key={index}>
            <Space key={`space-${index}`} margin={5} />
            <ArrowButton
              key={`button-${index}`}
              color={styles.button.color}
              textColor='black'
              text={text}
              onClick={to(route)}
            />
          </View>
        ))}
        <Space />
      </View>
    </ScrollView>
  );
};
