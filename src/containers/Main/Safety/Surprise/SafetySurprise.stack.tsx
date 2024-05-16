import { createStackNavigator } from '@react-navigation/stack';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import React from 'react';
import { SafetySurpriseRoutes } from 'containers/Main/Safety/Surprise/SafetySurprise.routes';
import { SafetySurprise } from 'containers/Main/Safety/Surprise/SafetySurprise';
import { SafetySurpriseView } from 'containers/Main/Safety/Surprise/View/SafetySurpriseView';

const Stack = createStackNavigator();

export const SafetySurpriseStack = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current }) => ({ cardStyle: { opacity: current.progress } }),
      }}>
      <Stack.Screen
        options={optionsFor('Safety Surprise')}
        name={SafetySurpriseRoutes.PICK}
        component={SafetySurprise}
      />

      <Stack.Screen
        options={optionsFor('Safety Surprise')}
        name={SafetySurpriseRoutes.VIEW}
        component={SafetySurpriseView}
      />
    </Stack.Navigator>
  );
};
