import React, { ComponentType, useEffect } from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icons from './assets';

import { HomeStackScreen } from './Home/Home.stack';
import { SafetyStack } from 'containers/Main/Safety/Safety.stack';
import { ReachOutStack } from 'containers/Main/ReachOut/ReachOut.stack';
import { TriggerStack } from 'containers/Main/Trigger/Trigger.stack';
import { LearnStack } from 'containers/Main/Learn/Learn.stack';
import { ProgressStack } from 'containers/Main/Progress/Progress.stack';
import { MainTabRoutes } from 'containers/Main/MainTabRoutes';
import { useNavigation } from '@react-navigation/native';
import { HomeRoutes } from 'containers/Main/Home/Home.stack.routes';
import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';
import { TriggerRoutes } from 'containers/Main/Trigger/Trigger.routes';
import { LearnRoutes } from 'containers/Main/Learn/Learn.routes';
import { ProgressRoutes } from 'containers/Main/Progress/Progress.routes';
import { BackProvider } from 'components/CustomHeader/CustomHeader';

const Tab = createBottomTabNavigator();

export const Main: React.FC = () => {
  return (
    <Tab.Navigator lazy={false} tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name={MainTabRoutes.HOME}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icons.HomeActiveIcon width={26} /> : <Icons.HomeInactiveIcon width={26} />,
        }}
        component={TABS[MainTabRoutes.HOME]}
      />
      <Tab.Screen
        name={MainTabRoutes.SAFETY}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icons.LighthouseActiveIcon width={26} /> : <Icons.LighthouseInactiveIcon width={26} />,
        }}
        component={TABS[MainTabRoutes.SAFETY]}
      />
      <Tab.Screen
        name={MainTabRoutes.REACH_OUT}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icons.ChatActiveIcon width={26} /> : <Icons.ChatInactiveIcon width={26} />,
        }}
        component={TABS[MainTabRoutes.REACH_OUT]}
      />
      <Tab.Screen
        name={MainTabRoutes.TRIGGER}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icons.FireActiveIcon width={26} /> : <Icons.FireInactiveIcon width={26} />,
        }}
        component={TABS[MainTabRoutes.TRIGGER]}
      />
      <Tab.Screen
        name={MainTabRoutes.LEARN}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icons.LearnActiveIcon width={26} /> : <Icons.LearnInactiveIcon width={26} />,
        }}
        component={TABS[MainTabRoutes.LEARN]}
      />
      <Tab.Screen
        name={MainTabRoutes.PROGRESS}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icons.ProgressActiveIcon width={26} /> : <Icons.ProgressInactiveIcon width={26} />,
        }}
        component={TABS[MainTabRoutes.PROGRESS]}
      />
    </Tab.Navigator>
  );
};

export const MainStack = () => {
  return (
    <BackProvider>
      <Main />
    </BackProvider>
  );
};

const WrapTab: React.FC<{ route: MainTabRoutes; main: string; params?: object }> = ({
  route,
  main,
  params,
  children,
}) => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  useEffect(() => {
    return navigation.addListener('tabPress', () => {
      navigation.navigate(main, params);
    });
  }, [params, main, route, navigation]);

  return <>{children}</>;
};

const TABS: { [key: string]: ComponentType<any> } = [
  { screen: HomeStackScreen, route: MainTabRoutes.HOME, main: HomeRoutes.HOME },
  { screen: SafetyStack, route: MainTabRoutes.SAFETY, main: SafetyRoutes.MENU },
  {
    screen: ReachOutStack,
    route: MainTabRoutes.REACH_OUT,
    main: MainTabRoutes.REACH_OUT,
    params: { screen: ReachOutRoutes.MENU },
  },
  { screen: TriggerStack, route: MainTabRoutes.TRIGGER, main: TriggerRoutes.MENU },
  { screen: LearnStack, route: MainTabRoutes.LEARN, main: LearnRoutes.MAIN },
  { screen: ProgressStack, route: MainTabRoutes.PROGRESS, main: ProgressRoutes.MAIN },
]
  .map((tab) => {
    const Screen = tab.screen;
    return {
      route: tab.route,
      screen: () => (
        <WrapTab route={tab.route} main={tab.main} params={tab.params}>
          <Screen />
        </WrapTab>
      ),
    };
  })
  .reduce((acc, act) => ({ ...acc, [act.route]: act.screen }), {});
