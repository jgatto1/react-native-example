import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { ReachOutTrustedPeopleRoutes } from './ReachOutTrustedPeople.routes';
import { ReachOutTrustedPeople } from 'containers/Main/ReachOut/TrustedPeople/ReachOutTrustedPeople';
import { ReachOutTrustedPeopleAdd } from 'containers/Main/ReachOut/TrustedPeople/Add/ReachOutTrustedPeopleAdd';

const Stack = createStackNavigator();

export const ReachOutTrustedPeopleStack: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={optionsFor('Message Trusted People', {
          popupProps: {
            title: 'MORE INFORMATION',
            content:
              "Try it out!\n\nJust add a few people and see how it works.\n\nIt's than calling or texting someone directly.\n\nIt's useful when you want support and it's hard for you to reach out.",
          },
        })}
        name={ReachOutTrustedPeopleRoutes.MAIN}
        component={ReachOutTrustedPeople}
      />
      <Stack.Screen
        name={ReachOutTrustedPeopleRoutes.ADD}
        options={{ headerShown: false }}
        component={ReachOutTrustedPeopleAdd}
      />
    </Stack.Navigator>
  );
};
