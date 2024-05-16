import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NO_HEADER, useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { TriggerRoutes } from './Trigger.routes';
import { Trigger } from 'containers/Main/Trigger/Trigger';
import { TriggerLogStack } from 'containers/Main/Trigger/Log/TriggerLog.stack';
import { TriggerPrepareAheadStack } from 'containers/Main/Trigger/PrepareAhead/TriggerPrepareAhead.stack';
import { DailyActionStack } from 'containers/Main/Home/DailyActions/DailyActions.stack';
import { WeeklyTopicStack } from 'containers/Main/Home/WeeklyTopic/WeeklyTopic.stack';
import { CohortTopicContextProvider } from 'containers/Main/Home/CohortTopic.context';
import { ReachOutTrustedPeopleStack } from 'containers/Main/ReachOut/TrustedPeople/ReachOutTrustedPeople.stack';
import { SafetyPlanStack } from 'containers/Main/Safety/Plan/SafetyPlan.stack';
import { ReachOutCopingCoach } from 'containers/Main/ReachOut/CopingCoach/ReachOutCopingCoach';
import { ReachOutMessagesStack } from 'containers/Main/ReachOut/Messages/ReachOutMessages.stack';

const Stack = createStackNavigator();

export const TriggerStack = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <CohortTopicContextProvider>
      <Stack.Navigator initialRouteName={TriggerRoutes.MENU} detachInactiveScreens={false}>
        <Stack.Screen
          options={optionsFor('Trigger', {
            popupProps: {
              title: 'MORE INFORMATION',
              content:
                "Triggers are to be expected if you have trauma or addiction issues.\n\nTake a moment to log triggers here-it's easy with the tags (just click the ones that apply).\n\nIt takes under a minute. Then you'll get ideas to help manage the trigger\n\nSee the app Progress section for your trigger patterns over time",
            },
          })}
          name={TriggerRoutes.MENU}
          component={Trigger}
        />
        <Stack.Screen options={NO_HEADER} name={TriggerRoutes.LOG} component={TriggerLogStack} />
        <Stack.Screen options={NO_HEADER} name={TriggerRoutes.PREPARE_AHEAD} component={TriggerPrepareAheadStack} />

        <Stack.Screen options={NO_HEADER} name={TriggerRoutes.DAILY_ACTIONS} component={DailyActionStack} />
        <Stack.Screen options={NO_HEADER} name={TriggerRoutes.WEEKLY_TOPIC} component={WeeklyTopicStack} />
        <Stack.Screen options={NO_HEADER} name={TriggerRoutes.TRUSTED_PEOPLE} component={ReachOutTrustedPeopleStack} />

        <Stack.Screen options={NO_HEADER} name={TriggerRoutes.PLAN} component={SafetyPlanStack} />
        <Stack.Screen
          options={optionsFor('Coping Coach')}
          name={TriggerRoutes.COPING_COACH}
          component={ReachOutCopingCoach}
        />
        <Stack.Screen options={NO_HEADER} name={TriggerRoutes.MESSAGES} component={ReachOutMessagesStack} />
      </Stack.Navigator>
    </CohortTopicContextProvider>
  );
};
