import { createStackNavigator } from '@react-navigation/stack';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import React from 'react';
import { SafetyTalkToSelf } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf';
import { SafetyTalkToSelfRoutes } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf.routes';
import { SafetyTalkToSelfCreate } from 'containers/Main/Safety/TalkToSelf/Create/SafetyTalkToSelfCreate';
import { SafetyTalkToSelfListen } from 'containers/Main/Safety/TalkToSelf/Listen/SafetyTalkToSelfListen';

const Stack = createStackNavigator();

export const SafetyTalkToSelfStack = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator initialRouteName={SafetyTalkToSelfRoutes.MENU}>
      <Stack.Screen
        options={optionsFor('Talk To Self')}
        name={SafetyTalkToSelfRoutes.MENU}
        component={SafetyTalkToSelf}
      />

      <Stack.Screen
        options={optionsFor('Talk to Self')}
        name={SafetyTalkToSelfRoutes.CREATE}
        component={SafetyTalkToSelfCreate}
      />

      <Stack.Screen
        options={optionsFor('Listen to Safe Self')}
        name={SafetyTalkToSelfRoutes.LISTEN}
        component={SafetyTalkToSelfListen}
      />
    </Stack.Navigator>
  );
};
