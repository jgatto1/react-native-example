import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { TriggerPrepareAheadRoutes } from './TriggerPrepareAhead.routes';
import { TriggerPrepareAhead } from 'containers/Main/Trigger/PrepareAhead/TriggerPrepareAhead';
import { TriggerPrepareAheadCopingMessage } from 'containers/Main/Trigger/PrepareAhead/CopingMessage/TriggerPrepareAheadCopingMessage';
import { TriggerPrepareAheadCustomize } from 'containers/Main/Trigger/PrepareAhead/TriggerPrepareAheadCustomize/TriggerPrepareAheadCustomize';

const Stack = createStackNavigator();

export const TriggerPrepareAheadStack: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  const options = optionsFor('Prepare For A Trigger');

  return (
    <Stack.Navigator initialRouteName={TriggerPrepareAheadRoutes.MAIN}>
      <Stack.Screen options={options} name={TriggerPrepareAheadRoutes.MAIN} component={TriggerPrepareAhead} />
      <Stack.Screen
        options={options}
        name={TriggerPrepareAheadRoutes.COPING_MESSAGE}
        component={TriggerPrepareAheadCopingMessage}
      />
      <Stack.Screen
        options={options}
        name={TriggerPrepareAheadRoutes.CUSTOMIZE}
        component={TriggerPrepareAheadCustomize}
      />
    </Stack.Navigator>
  );
};
