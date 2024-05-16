import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NO_HEADER, useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { ProgressRoutes } from './Progress.routes';
import { Progress } from 'containers/Main/Progress/Progress';
import { ProgressProvider } from 'containers/Main/Progress/Progress.context';
import { ProgressSend } from 'containers/Main/Progress/Send/ProgressSend';
import { TreeProgressContextProvider } from 'containers/Main/Home/AR/TreeProgress/TreeProgress.context';
import { CohortTopicContextProvider } from 'containers/Main/Home/CohortTopic.context';
import { DailyActionStack } from 'containers/Main/Home/DailyActions/DailyActions.stack';
import { TriggerPrepareAheadStack } from 'containers/Main/Trigger/PrepareAhead/TriggerPrepareAhead.stack';
import { SafetyBoomerangStack } from 'containers/Main/Safety/Boomerang/SafetyBoomerang';
import { ReachOutSocialFeedStack } from 'containers/Main/ReachOut/SocialFeed/ReachOutSocialFeed.stack';
import { SafetySafePlace } from 'containers/Main/Safety/SafePlace/SafetySafePlace';
import { SafetySafePlaceOptionsProps } from 'containers/Main/Safety/Safety.stack';
import { SafetyPlanStack } from 'containers/Main/Safety/Plan/SafetyPlan.stack';
import { SafetySurpriseStack } from 'containers/Main/Safety/Surprise/SafetySurprise.stack';
import { SafetyTalkToSelfStack } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf.stack';
import { SafetyPictureStack } from 'containers/Main/Safety/Picture/SafetyPicture.stack';
import { Platform } from 'react-native';
import { useARSupportedContext } from 'providers/ar/support-ar.context';
import { ProgressARStack } from 'containers/Main/Progress/AR/ProgressAR.stack';

const Stack = createStackNavigator();

const ProgressStackInner: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();
  const supportAR = useARSupportedContext();

  return (
    <TreeProgressContextProvider>
      <CohortTopicContextProvider>
        <Stack.Navigator
          initialRouteName={ProgressRoutes.MAIN}
          screenOptions={
            Platform.OS === 'android'
              ? { cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }
              : {}
          }>
          <Stack.Screen
            options={optionsFor('Progress', {
              popupProps: {
                title: 'MORE INFORMATION',
                content:
                  "This section is really useful for finding out how you're doing over time.\n\nIt can help you see you progress and/or warning signs.\n\nSee the learn section of the app for how to understand each graph.",
              },
            })}
            name={ProgressRoutes.MAIN}
            component={Progress}
          />
          <Stack.Screen options={optionsFor('Progress')} name={ProgressRoutes.SEND_REPORT} component={ProgressSend} />

          <Stack.Screen options={NO_HEADER} name={ProgressRoutes.DAILY_ACTIONS} component={DailyActionStack} />

          <Stack.Screen options={NO_HEADER} name={ProgressRoutes.PREPARE_AHEAD} component={TriggerPrepareAheadStack} />
          <Stack.Screen
            name={ProgressRoutes.BOOMERANG}
            options={optionsFor('Safety Boomerang', { headerShown: false })}
            component={SafetyBoomerangStack}
          />
          <Stack.Screen name={ProgressRoutes.SOCIAL_FEED} options={NO_HEADER} component={ReachOutSocialFeedStack} />
          <Stack.Screen
            options={optionsFor('My Safe Place', SafetySafePlaceOptionsProps)}
            name={ProgressRoutes.SAFE_PLACE}
            component={SafetySafePlace}
          />
          <Stack.Screen
            name={ProgressRoutes.PLAN}
            options={optionsFor('Safety Plan', { headerShown: false })}
            component={SafetyPlanStack}
          />
          <Stack.Screen
            options={optionsFor('Safety Surprise', { headerShown: false })}
            name={ProgressRoutes.SURPRISE}
            component={SafetySurpriseStack}
          />
          <Stack.Screen
            name={ProgressRoutes.TALK_TO_SELF}
            options={optionsFor('Safety Talk To Self', { headerShown: false })}
            component={SafetyTalkToSelfStack}
          />

          <Stack.Screen
            name={ProgressRoutes.PICTURE}
            options={optionsFor('Safe / Unsafe Picture', { headerShown: false })}
            component={SafetyPictureStack}
          />

          {supportAR.support === 'YES' && (
            <Stack.Screen options={{ headerShown: false }} name={ProgressRoutes.AR_TREE} component={ProgressARStack} />
          )}
        </Stack.Navigator>
      </CohortTopicContextProvider>
    </TreeProgressContextProvider>
  );
};

export const ProgressStack = () => {
  return (
    <ProgressProvider>
      <ProgressStackInner />
    </ProgressProvider>
  );
};
