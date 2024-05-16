import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { TriggerLogRoutes } from './TriggerLog.routes';
import { TriggerLog } from 'containers/Main/Trigger/Log/TriggerLog';
import { TriggerLogChangeTriggerTag } from 'containers/Main/Trigger/Log/ChangeTriggerTags/TriggerLogChangeTriggerTag';
import { TriggerLogNextSteps } from 'containers/Main/Trigger/Log/NextSteps/TriggerLogNextSteps';
import { TriggerLogNextStepsActions } from 'containers/Main/Trigger/Log/NextSteps/Actions/TriggerLogNextStepsActions';

const Stack = createStackNavigator();

export const TriggerLogStack: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator initialRouteName={TriggerLogRoutes.MAIN}>
      <Stack.Screen
        options={optionsFor('Trigger', {
          popupProps: {
            title: 'MORE INFORMATION',
            content:
              "Triggers are to be expected if you have trauma or addiction issues.\n\nTake a moment to log triggers here--it's easy with the tags (just click the ones that apply).\n\nIt takes under a minute. The you'll get ideas to help manage the trigger.\n\nSee the app Progress section for you trigger patterns over the time.",
          },
        })}
        name={TriggerLogRoutes.MAIN}
        component={TriggerLog}
      />

      <Stack.Screen
        options={optionsFor('Prepare For A Trigger')}
        name={TriggerLogRoutes.PREPARE}
        component={TriggerLogChangeTriggerTag}
      />

      <Stack.Screen
        options={optionsFor('Trigger: Next Steps')}
        name={TriggerLogRoutes.NEXT_STEPS}
        component={TriggerLogNextSteps}
      />

      <Stack.Screen
        options={optionsFor('Trigger: Next Steps')}
        name={TriggerLogRoutes.NEXT_STEPS_ACTIONS}
        component={TriggerLogNextStepsActions}
      />
    </Stack.Navigator>
  );
};
