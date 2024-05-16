import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NO_HEADER, useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { ReachOutRoutes } from './ReachOut.routes';
import { ReachOut } from './ReachOut';
import { ReachOutMessagesStack } from './Messages/ReachOutMessages.stack';
import { ReachOutLeaderOfficeHours } from './LeaderOfficeHours/ReachOutLeaderOfficeHours';
import { ReachOutSocialFeedStack } from 'containers/Main/ReachOut/SocialFeed/ReachOutSocialFeed.stack';
import { ReachOutSpecialInterestGroupsStack } from 'containers/Main/ReachOut/SpecialInterestGroups/ReachOutSpecialInterestGroups.stack';
import { ReachOutTrustedPeopleStack } from 'containers/Main/ReachOut/TrustedPeople/ReachOutTrustedPeople.stack';
import { ReachOutCopingCoach } from 'containers/Main/ReachOut/CopingCoach/ReachOutCopingCoach';

const Stack = createStackNavigator();

export const ReachOutStack = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator initialRouteName={ReachOutRoutes.MENU}>
      <Stack.Screen options={optionsFor('Reach Out')} name={ReachOutRoutes.MENU} component={ReachOut} />

      <Stack.Screen options={NO_HEADER} name={ReachOutRoutes.MESSAGES} component={ReachOutMessagesStack} />

      <Stack.Screen
        options={optionsFor('Leader Office Hours', {
          popupProps: {
            title: 'MORE INFORMATION',
            content:
              "Office hours are a terrific opportunity to speak one-to-one with your Seeking Safety leader.\n\nIf's brief, typically around 10 minutes. You can raise questions, suggestions, concerns or just get some support.\n\nWhen your leader posts times, this screen lets you request contact. The leader then reaches out you during Office hours.\n\nTry it! And c'mon back any time",
          },
        })}
        name={ReachOutRoutes.LEADER_OFFICE_HOURS}
        component={ReachOutLeaderOfficeHours}
      />

      <Stack.Screen name={ReachOutRoutes.SOCIAL_FEED} options={NO_HEADER} component={ReachOutSocialFeedStack} />

      <Stack.Screen
        name={ReachOutRoutes.INTEREST_GROUPS}
        options={NO_HEADER}
        component={ReachOutSpecialInterestGroupsStack}
      />

      <Stack.Screen name={ReachOutRoutes.TRUSTED_PEOPLE} options={NO_HEADER} component={ReachOutTrustedPeopleStack} />

      <Stack.Screen
        name={ReachOutRoutes.COPING_COACH}
        options={optionsFor('Coping Coach')}
        component={ReachOutCopingCoach}
      />
    </Stack.Navigator>
  );
};
