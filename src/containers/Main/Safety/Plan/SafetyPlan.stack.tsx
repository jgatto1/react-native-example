import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { SafetyPlan } from './SafetyPlan';
import { SafetyPlanRoutes } from './SafetyPlan.routes';
import { SafetyPlanExport } from './Export/SafetyPlanExport';
import { SafetyPlanExample } from './Example/SafetyPlanExample';
import { SafetyPlanWizard } from './Wizard/SafetyPlanWizard';
import { SafetyPlanView } from './View/SafetyPlanView';
import { SafetyPlanContextProvider } from './SafetyPlan.context';
import { SafetyPlanViewCoping } from './View/Coping/SafetyPlanViewCoping';

const Stack = createStackNavigator();

export const SafetyPlanStack: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <SafetyPlanContextProvider>
      <Stack.Navigator initialRouteName={SafetyPlanRoutes.MENU}>
        <Stack.Screen options={optionsFor('Safety Plan Wizard')} name={SafetyPlanRoutes.MENU} component={SafetyPlan} />

        <Stack.Screen
          options={optionsFor('Safety Plan Export')}
          name={SafetyPlanRoutes.EXPORT}
          component={SafetyPlanExport}
        />

        <Stack.Screen
          name={SafetyPlanRoutes.EXAMPLE}
          options={optionsFor('Sample Safety Plan')}
          component={SafetyPlanExample}
        />

        <Stack.Screen
          name={SafetyPlanRoutes.WIZARD}
          options={optionsFor('Safety Plan Wizard')}
          component={SafetyPlanWizard}
        />

        <Stack.Screen
          name={SafetyPlanRoutes.BEHAVIOUR}
          options={optionsFor('Safety Plan')}
          component={SafetyPlanView}
        />
        <Stack.Screen
          name={SafetyPlanRoutes.COPING_SKILLS}
          options={optionsFor('Safety Plan')}
          component={SafetyPlanViewCoping}
        />
      </Stack.Navigator>
    </SafetyPlanContextProvider>
  );
};
