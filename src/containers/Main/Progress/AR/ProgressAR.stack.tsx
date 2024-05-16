import React from 'react';
import { NO_HEADER, useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { TreeProgress } from 'containers/Main/Home/AR/TreeProgress/TreeProgress';
import { createStackNavigator } from '@react-navigation/stack';
import { ARCamera } from '../../Home/AR/ARCamera/ARCamera';
import { ProgressARRoutes } from 'containers/Main/Progress/AR/Progress.AR.routes';
import { MainTabRoutes } from 'containers/Main/MainTabRoutes';
import { ProgressRoutes } from 'containers/Main/Progress/Progress.routes';

const Stack = createStackNavigator();

export const ProgressARStack: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator detachInactiveScreens={true} initialRouteName={ProgressARRoutes.PROGRESS}>
      <Stack.Screen
        options={optionsFor('Tree Progress')}
        name={ProgressARRoutes.PROGRESS}
        component={ProgressARTreeProgress}
      />
      <Stack.Screen options={NO_HEADER} name={ProgressARRoutes.CAMERA} component={ARCamera} />
    </Stack.Navigator>
  );
};

const ProgressARTreeProgress = () => {
  return (
    <TreeProgress
      cameraRoute={{
        name: MainTabRoutes.PROGRESS,
        params: { screen: ProgressRoutes.AR_TREE, params: { screen: ProgressARRoutes.CAMERA } },
      }}
    />
  );
};
