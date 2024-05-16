import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileSettings } from 'containers/Main/Home/ProfileSettings/ProfileSettings';
import { ProfileSettingsRoutes } from 'containers/Main/Home/ProfileSettings/ProfileSettings.routes';
import { ProfileSettingsPhotoContextProvider } from './Photo/context/ProfileSettingsPhoto.context';
import { ProfileSettingsPhotoAvatars } from './Photo/Avatar/ProfileSettingsPhotoAvatar';
import { ProfileSettingsPhotoCamera } from './Photo/Camera/ProfileSettingsPhotoCamera';
import { ProfileSettingsPhoto } from './Photo/ProfileSettingsPhoto';
import { ProfileSettingsAboutMe } from './AboutMe/ProfileSettingsAboutMe';
import { ProfileSettingsAboutMeGroups } from './AboutMe/Groups/ProfileSettingsAboutMeGroups';
import { ProfileSettingsAboutMeGroupsContextProvider } from './AboutMe/Groups/ProfileSettingsAboutMeGroups.context';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export const ProfileSettingsStack: React.VFC = () => {
  const options = {
    gestureEnabled: false,
    headerShown: false,
  };

  return (
    <View style={styles.root}>
      <ProfileSettingsPhotoContextProvider>
        <ProfileSettingsAboutMeGroupsContextProvider>
          <Stack.Navigator initialRouteName={ProfileSettingsRoutes.MAIN_STACK} mode='modal' screenOptions={options}>
            <Stack.Screen options={options} name={ProfileSettingsRoutes.MAIN_STACK}>
              {() => <ProfileSettingsMain />}
            </Stack.Screen>
            <Stack.Screen options={options} name={ProfileSettingsRoutes.AVATAR}>
              {() => <ProfileSettingsPhotoAvatars />}
            </Stack.Screen>
            <Stack.Screen options={options} name={ProfileSettingsRoutes.CAMERA}>
              {() => <ProfileSettingsPhotoCamera />}
            </Stack.Screen>
          </Stack.Navigator>
        </ProfileSettingsAboutMeGroupsContextProvider>
      </ProfileSettingsPhotoContextProvider>
    </View>
  );
};

const MainStack = createStackNavigator();

const ProfileSettingsMain = () => {
  const screenOptionsFor = useThemedCustomHeaderFactory();

  return (
    <MainStack.Navigator>
      <MainStack.Screen options={screenOptionsFor('My Account Settings')} name={ProfileSettingsRoutes.MAIN}>
        {() => <ProfileSettings />}
      </MainStack.Screen>
      <MainStack.Screen
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
        name={ProfileSettingsRoutes.PHOTO}>
        {() => <ProfileSettingsPhoto />}
      </MainStack.Screen>
      <MainStack.Screen options={screenOptionsFor('Edit About Me')} name={ProfileSettingsRoutes.ABOUT_ME}>
        {() => <ProfileSettingsAboutMe />}
      </MainStack.Screen>
      <MainStack.Screen options={screenOptionsFor('Special Interest Groups')} name={ProfileSettingsRoutes.GROUPS}>
        {() => <ProfileSettingsAboutMeGroups />}
      </MainStack.Screen>
    </MainStack.Navigator>
  );
};
