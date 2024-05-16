import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { WeeklyTopicRoutes as Routes } from './WeeklyTopic.stack.routes';
import { useCohortTopic } from 'containers/Main/Home/CohortTopic.context';
import { useTheme } from 'providers/theme/ThemeProvider';
import { customHeaderOptions, ScreenOptions, Text } from 'components';
import { WeeklyTopic } from './WeeklyTopic';
import { Handout } from './Handout/Handout';
import { NextSession } from './NextSession/NextSession';
import { Commitment } from './Commitment/Commitment';
import { PowerUp } from './WeeklyPowerUps/WeeklyPowerUps';
import { PreviousSession } from './PreviousSession/PreviousSession';
import { ZoomMeetingContextProvider } from './NextSession/ZoomMeeting.context';
import { CommitmentContextProvider } from './Commitment/Commitment.context';
import { WeeklyTopicModal } from './modals/WeeklyModal';
import { PreviousTopicAnimation } from './PreviousSession/PreviousTopicAnimation';
import { WeeklyPowerUpsContextProvider } from './WeeklyPowerUps/WeeklyPowerUps.context';
import { DailyActionQuizContextProvider } from 'containers/Main/Home/DailyActions/Quiz/context/DailyActionQuiz.context';
import { DailyActionQuestionModal } from 'containers/Main/Home/DailyActions/Question/modal/DailyActionQuestionModal';
import { DailyActionQuizModal } from 'containers/Main/Home/DailyActions/Quiz/modal/DailyActionQuizModal';
import { DailyActionQuizModalCongrats } from 'containers/Main/Home/DailyActions/Quiz/modal/DailyActionQuizModalCongrats';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { DailyActionQuiz } from 'containers/Main/Home/DailyActions/Quiz/DailyActionQuiz';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

// TODO: use cohortTopic hook to get context, this means it should wrap home compoent perhaps
// or maybe just the weekly topic main component
const WeeklyTopicMain: React.VFC = () => {
  const { currentEvent } = useCohortTopic();
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }}>
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Weekly Topic')
        }
        name={Routes.MENU}
        component={WeeklyTopic}
      />
      <Stack.Screen options={{ headerShown: false }} name={Routes.HANDOUT} component={Handout} />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Weekly Session')
        }
        name={Routes.NEXT_SESSION}
        component={NextSession}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Weekly Commitment')
        }
        name={Routes.COMMITMENT}
        component={Commitment}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(
            route,
            navigation,
            theme,
            <Text bold>
              Power Up for{' '}
              <Text bold italic>
                {currentEvent.topic.name}
              </Text>
            </Text>
          )
        }
        name={Routes.POWER_UP}
        component={PowerUp}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) => customHeaderOptions(route, navigation, theme, 'Weekly Quiz')}
        name={DailyActionsRoutes.QUIZ}
        component={DailyActionQuiz}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Previous Sessions')
        }
        name={Routes.PREVIOUS_SESSION}
        component={PreviousSession}
      />
      <Stack.Screen
        options={({ route, navigation }: ScreenOptions) =>
          customHeaderOptions(route, navigation, theme, 'Previous Topic Animation')
        }
        name={Routes.PREV_ANIMATION}
        component={PreviousTopicAnimation}
      />
    </Stack.Navigator>
  );
};

export const WeeklyTopicStack: React.VFC = () => {
  const opts = { headerShown: false };

  return (
    <ZoomMeetingContextProvider>
      <DailyActionQuizContextProvider>
        <CommitmentContextProvider>
          <WeeklyPowerUpsContextProvider>
            <ModalStack.Navigator mode='modal'>
              <Stack.Screen name={Routes.MAIN} options={opts} component={WeeklyTopicMain} />
              <Stack.Screen name={Routes.MODAL} options={opts} component={WeeklyTopicModal} />
              <Stack.Screen
                name={DailyActionsRoutes.MODAL_QUESTION}
                options={opts}
                component={DailyActionQuestionModal}
              />
              <Stack.Screen name={DailyActionsRoutes.MODAL_QUIZ} options={opts} component={DailyActionQuizModal} />
              <Stack.Screen
                name={DailyActionsRoutes.MODAL_QUIZ_CONGRATS}
                options={opts}
                component={DailyActionQuizModalCongrats}
              />
              {/* <Stack.Screen name={Routes.MODAL_QUIZ} options={opts} component={DailyActionQuizModal} />
            <Stack.Screen name={Routes.MODAL_QUIZ_CONGRATS} options={opts} component={DailyActionQuizModalCongrats} /> */}
            </ModalStack.Navigator>
          </WeeklyPowerUpsContextProvider>
        </CommitmentContextProvider>
      </DailyActionQuizContextProvider>
    </ZoomMeetingContextProvider>
  );
};
