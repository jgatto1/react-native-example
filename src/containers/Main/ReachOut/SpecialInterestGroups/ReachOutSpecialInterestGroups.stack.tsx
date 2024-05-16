import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { ReachOutSpecialInterestGroupsRoutes } from './ReachOutSpecialInterestGroups.routes';
import { ReachOutSpecialInterestGroups } from 'containers/Main/ReachOut/SpecialInterestGroups/ReachOutSpecialInterestGroups';
import {
  ReachOutSpecialInterestGroupProvider,
  useReachOutSpecialInterestGroups,
} from './ReachOutSpecialInterestGroup.context';
import { ReachOutSpecialInterestGroupsChat } from 'containers/Main/ReachOut/SpecialInterestGroups/Chat/ReachOutSpecialInterestGroupsChat';

const Stack = createStackNavigator();

export const ReachOutSpecialInterestGroupsStack: React.VFC = () => {
  return (
    <ReachOutSpecialInterestGroupProvider>
      <ReachOutSpecialInterestGroupsStackInner />
    </ReachOutSpecialInterestGroupProvider>
  );
};

const ReachOutSpecialInterestGroupsStackInner = () => {
  const optionsFor = useThemedCustomHeaderFactory();
  const interestGroups = useReachOutSpecialInterestGroups();
  return (
    <Stack.Navigator initialRouteName={ReachOutSpecialInterestGroupsRoutes.MAIN}>
      <Stack.Screen
        options={optionsFor('Special Interest Groups', {
          popupProps: {
            title: 'MORE INFORMATION',
            content:
              'Special Interest Groups help you connect with other app members on topics of interest.\n\nJoin as many as you like and suggest new ones too.\n\nChange you groups by clicking the Gear icon from the app Home Screen.',
          },
        })}
        name={ReachOutSpecialInterestGroupsRoutes.MAIN}
        component={ReachOutSpecialInterestGroups}
      />
      <Stack.Screen
        options={optionsFor(interestGroups.actualGroup?.name || 'Join to interest group')}
        name={ReachOutSpecialInterestGroupsRoutes.CHAT}
        component={ReachOutSpecialInterestGroupsChat}
      />
    </Stack.Navigator>
  );
};
