import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';

// @ts-ignore
declare type TabOptionsFactory = (props: { navigation: any; route: RouteProp<any, any> }) => BottomTabNavigationOptions;

interface TabButton {
  Focus: React.FC;
  Blur: React.FC;
  overrides?: Partial<BottomTabNavigationOptions>;
}

declare type TabButtonOptsFactory = (button: TabButton) => TabOptionsFactory;

export const tabButtonOptsFactory: TabButtonOptsFactory =
  ({ Focus, Blur, overrides }) =>
  ({}) => {
    return {
      tabBarIcon: ({ focused }) => (focused ? <Focus /> : <Blur />),
      ...overrides,
    };
  };
