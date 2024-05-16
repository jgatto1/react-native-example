import React from 'react';
import { NO_HEADER, useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { TreeProgress } from 'containers/Main/Home/AR/TreeProgress/TreeProgress';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeARRoutes } from 'containers/Main/Home/AR/HomeAR.routes';
import { ARCamera } from './ARCamera/ARCamera';
import { HomeRoutes } from 'containers/Main/Home/Home.stack.routes';

const Stack = createStackNavigator();

export const HomeARStack: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator detachInactiveScreens={true} initialRouteName={HomeARRoutes.PROGRESS}>
      <Stack.Screen options={optionsFor('Tree Progress')} name={HomeARRoutes.PROGRESS} component={HomeARTreeProgress} />
      <Stack.Screen options={NO_HEADER} name={HomeARRoutes.CAMERA} component={ARCamera} />
    </Stack.Navigator>
  );
};

const HomeARTreeProgress = () => (
  <TreeProgress cameraRoute={{ name: HomeRoutes.AR_TREE, params: { screen: HomeARRoutes.CAMERA } }} />
);
