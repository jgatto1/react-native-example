import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'providers/theme/ThemeProvider';
import { customHeaderOptions, ScreenOptions } from 'components';
import { Home } from './Home';

import { CommentSection } from './SocialFeed/CommentSection/ComentSection';
import { HomeRoutes as Routes } from './Home.stack.routes';
import { DailyActionStack } from './DailyActions/DailyActions.stack';
import { NewPostScreen } from './NewPostScreen/NewPostScreen';
import { ImageDetail } from './SocialFeed/ImageDetail/ImageDetail';
import { ProfileSettingsStack } from './ProfileSettings/ProfileSettings.stack';
import { WeeklyTopicStack } from './WeeklyTopic/WeeklyTopic.stack';
import { CohortTopicContextProvider } from './CohortTopic.context';
import Notifications from './Notifications/Notifications';
import { HomeARStack } from 'containers/Main/Home/AR/HomeAR.stack';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import { TreeProgressContextProvider } from 'containers/Main/Home/AR/TreeProgress/TreeProgress.context';
import { useARSupportedContext } from 'providers/ar/support-ar.context';

export type HomeStackParamList = {
  home: undefined;
  'new-post': undefined;
  settings: undefined;
  notifications: undefined;
  comments: { mainPost: any };
  'profile-details': { userName: string; userId: string; imageUrl: string };
  'image-detail': undefined;
  'Daily-Actions': undefined;
  'Weekly-Topic': undefined;
  'AR-Tree': undefined;
};
const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackScreen = () => {
  const theme = useTheme();
  const supportAR = useARSupportedContext();

  return (
    <TreeProgressContextProvider>
      <CohortTopicContextProvider>
        <HomeStack.Navigator detachInactiveScreens={false}>
          <HomeStack.Screen options={{ headerShown: false }} name={Routes.HOME} component={Home} />
          <HomeStack.Screen
            options={({ route, navigation }: ScreenOptions) =>
              customHeaderOptions(route, navigation, theme, 'New Social Feed Post')
            }
            name={Routes.NEW_POST}
            component={NewPostScreen}
          />
          <HomeStack.Screen options={{ headerShown: false }} name={Routes.SETTINGS} component={ProfileSettingsStack} />
          <HomeStack.Screen
            options={({ route, navigation }: ScreenOptions) =>
              customHeaderOptions(route, navigation, theme, 'Notifications')
            }
            name={Routes.NOTIFICATIONS}
            component={Notifications}
          />
          <HomeStack.Screen
            options={({ route, navigation }: ScreenOptions) =>
              customHeaderOptions(route, navigation, theme, 'View Comments')
            }
            name={Routes.COMMENTS}
            component={CommentSection}
          />
          <HomeStack.Screen
            options={({ route, navigation }: ScreenOptions) => customHeaderOptions(route, navigation, theme, 'Profile')}
            name={Routes.PROFILE_DETAILS}
            component={ProfileDetails}
          />
          <HomeStack.Screen options={{ headerShown: false }} name={Routes.IMAGE_DETAIL} component={ImageDetail} />
          <HomeStack.Screen options={{ headerShown: false }} name={Routes.DAILY_ACTIONS} component={DailyActionStack} />
          <HomeStack.Screen options={{ headerShown: false }} name={Routes.WEEKLY_TOPIC} component={WeeklyTopicStack} />
          {supportAR.support === 'YES' && (
            <HomeStack.Screen options={{ headerShown: false }} name={Routes.AR_TREE} component={HomeARStack} />
          )}
        </HomeStack.Navigator>
      </CohortTopicContextProvider>
    </TreeProgressContextProvider>
  );
};
