import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DailySafetyCheck } from './Check/DailySafetyCheck';
import { DailySafetyReflection } from './Reflection/DailySafetyReflection';
import { DailyActionQuiz } from './Quiz/DailyActionQuiz';
import { DailyActionQuestion } from './Question/DailyActionQuestion';
import { DailyActionQuestionModal } from './Question/modal/DailyActionQuestionModal';
import { DailyActions } from './DailyActions';
import { DailyActionsRoutes as Routes } from './DailyActions.stack.routes';
import { DailyActionQuizModal } from './Quiz/modal/DailyActionQuizModal';
import { DailyActionQuizModalCongrats } from './Quiz/modal/DailyActionQuizModalCongrats';
import { useTheme } from 'providers/theme/ThemeProvider';
import { customHeaderOptions, ScreenOptions } from 'components';
import { DailyActionQuestionContextProvider } from './Question/context/DailyActionQuestion.context';
import { DailyActionQuizContextProvider } from './Quiz/context/DailyActionQuiz.context';
import { NO_HEADER, useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { ReachOutTrustedPeopleStack } from 'containers/Main/ReachOut/TrustedPeople/ReachOutTrustedPeople.stack';
import { TriggerLogStack } from 'containers/Main/Trigger/Log/TriggerLog.stack';
import { ReachOutCopingCoach } from 'containers/Main/ReachOut/CopingCoach/ReachOutCopingCoach';
import { ReachOutMessagesStack } from 'containers/Main/ReachOut/Messages/ReachOutMessages.stack';
import { LearnProvider, useLearn } from 'containers/Main/Learn/Learn.context';
import { LearnPostId } from 'containers/Main/Learn/Learn.routes';
import { buildLearnPostFor } from 'containers/Main/Learn/Post/LearnPost';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const DAILY_SAFETY_INFO =
  'This is what it all comes down to--how safe are you?\n\nAnswer these questions daily so you can see how your doing, and stay on track.\n\nListen to the messages in your behavior--what do they tell you?\n\nNo judgment or blame, but just notice, and get support from your app group.';
export const DAILY_SAFETY_POPUP_CONFIG = {
  title: 'MORE INFORMATION',
  content: DAILY_SAFETY_INFO,
};

const DailyActionMain: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();
  const theme = useTheme();

  const learn = useLearn();

  const urgentResourcesPost = learn.content
    .map((c) => c.posts)
    .reduce((acc, act) => [...acc, ...act], [])
    .filter((p) => p.id === LearnPostId.URGENT_RESOURCES)[0];

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Daily Actions')
        }
        name={Routes.MENU}
        component={DailyActions}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Daily Safety Check', DAILY_SAFETY_POPUP_CONFIG)
        }
        name={Routes.CHECK}
        component={DailySafetyCheck}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Daily Safety Reflection')
        }
        name={Routes.REFLECTION}
        component={DailySafetyReflection}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) => customHeaderOptions(route, navigation, theme, 'Weekly Quiz')}
        name={Routes.QUIZ}
        component={DailyActionQuiz}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Daily Question')
        }
        name={Routes.QUESTION}
        component={DailyActionQuestion}
      />

      <Stack.Screen name={Routes.TRUSTED_PEOPLE} options={NO_HEADER} component={ReachOutTrustedPeopleStack} />
      <Stack.Screen options={NO_HEADER} name={Routes.LOG} component={TriggerLogStack} />
      <Stack.Screen name={Routes.COPING_COACH} options={optionsFor('Coping Coach')} component={ReachOutCopingCoach} />
      <Stack.Screen options={NO_HEADER} name={Routes.MESSAGES} component={ReachOutMessagesStack} />

      {urgentResourcesPost && (
        <Stack.Screen
          options={optionsFor('Learn')}
          name={Routes.LEARN_URGENT_RESOURCES}
          component={buildLearnPostFor(urgentResourcesPost, learn.reflections[urgentResourcesPost.id])}
        />
      )}
    </Stack.Navigator>
  );
};

export const DailyActionStack: React.VFC = () => {
  const opts = { headerShown: false };

  return (
    <DailyActionQuestionContextProvider>
      <DailyActionQuizContextProvider>
        <LearnProvider>
          <ModalStack.Navigator mode='modal'>
            <Stack.Screen name={Routes.MAIN} options={opts} component={DailyActionMain} />
            <Stack.Screen name={Routes.MODAL_QUESTION} options={opts} component={DailyActionQuestionModal} />
            <Stack.Screen name={Routes.MODAL_QUIZ} options={opts} component={DailyActionQuizModal} />
            <Stack.Screen name={Routes.MODAL_QUIZ_CONGRATS} options={opts} component={DailyActionQuizModalCongrats} />
          </ModalStack.Navigator>
        </LearnProvider>
      </DailyActionQuizContextProvider>
    </DailyActionQuestionContextProvider>
  );
};
