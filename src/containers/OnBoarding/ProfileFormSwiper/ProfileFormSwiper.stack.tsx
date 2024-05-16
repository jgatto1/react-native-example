import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'providers/theme/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { ProfilePhotoAvatarsScreen } from './Photo/Avatars/ProfilePhotoAvatars';
import { ProfilePhotoCameraScreen } from './Photo/Camera/ProfilePhotoCamera';
import React from 'react';
import { ProfileFormSwiper } from './ProfileFormSwiper';
import { StyleSheet, View } from 'react-native';
import { ProfileFormProvider } from './context/ProfileFormContext';
import { ProfileFormAboutMeFullText } from './About/FullText/ProfileFormAboutMeFullText';

const Stack = createStackNavigator();

export const ProfileFormSwiperStack = () => {
  const theme = useTheme();

  const navigationTheme = { ...theme.navigation, colors: { ...theme.navigation.colors, background: 'transparent' } };

  const navigationScreenOptions = {
    gestureEnabled: false,
    cardShadowEnabled: false,
    headerShown: false,
  };

  return (
    <View style={styles.root}>
      <ProfileFormProvider>
        <NavigationContainer independent={true} theme={navigationTheme}>
          <Stack.Navigator initialRouteName={'Swiper'} mode='modal' screenOptions={navigationScreenOptions}>
            <Stack.Screen name='Swiper' component={ProfileFormSwiper} />
            <Stack.Screen name='Avatar' component={ProfilePhotoAvatarsScreen} />
            <Stack.Screen name='Camera' component={ProfilePhotoCameraScreen} />
            <Stack.Screen name='AboutMe' component={ProfileFormAboutMeFullText} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProfileFormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
