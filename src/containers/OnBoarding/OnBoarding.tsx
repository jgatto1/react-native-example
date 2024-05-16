import { View } from 'react-native';
import { useOnBoardingStyles } from './OnBoarding.styles';
import React, { useState } from 'react';
import { BackgroundView } from '@components/BackgroundView/BackgroundView';
import { WelcomeSwiper } from './WelcomeSwiper/WelcomeSwiper';
import { ProfileFormSwiperStack } from './ProfileFormSwiper/ProfileFormSwiper.stack';

export const OnBoarding = () => {
  const styles = useOnBoardingStyles();

  const [welcomeFinished, setWelcomeFinished] = useState(false);

  return (
    <BackgroundView styles={{ middle: welcomeFinished && styles.formMiddleBackground }}>
      <View style={styles.mainContainer}>
        {!welcomeFinished && <WelcomeSwiper onFinish={() => setWelcomeFinished(true)} />}
        {welcomeFinished && <ProfileFormSwiperStack />}
      </View>
    </BackgroundView>
  );
};
