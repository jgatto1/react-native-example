import { createStackNavigator } from '@react-navigation/stack';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import React from 'react';
import { SafetyPictureRoutes } from 'containers/Main/Safety/Picture/SafetyPicture.routes';
import { SafetyPicture } from 'containers/Main/Safety/Picture/SafetyPicture';
import { SafetyPictureLoadSafe, SafetyPictureLoadUnsafe } from 'containers/Main/Safety/Picture/Load/SafetyPictureLoad';
import { SafetyPictureProvider } from 'containers/Main/Safety/Picture/SafetyPicture.context';

const Stack = createStackNavigator();

export const SafetyPictureStack = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <SafetyPictureProvider>
      <Stack.Navigator initialRouteName={SafetyPictureRoutes.MENU}>
        <Stack.Screen
          options={optionsFor('Safe / Unsafe Picture')}
          name={SafetyPictureRoutes.MENU}
          component={SafetyPicture}
        />

        <Stack.Screen
          options={optionsFor('Load Safe Picture')}
          name={SafetyPictureRoutes.LOAD_SAFE}
          component={SafetyPictureLoadSafe}
        />

        <Stack.Screen
          options={optionsFor('Listen to Self')}
          name={SafetyPictureRoutes.LOAD_UNSAFE}
          component={SafetyPictureLoadUnsafe}
        />
      </Stack.Navigator>
    </SafetyPictureProvider>
  );
};
