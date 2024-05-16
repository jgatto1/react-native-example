import { Button, Swiper, SwiperProps, Text } from 'components';
import React from 'react';
import { useWelcomeSwiperStyles } from './WelcomeSwiper.styles';
import { Image, ImageRequireSource, Platform, View } from 'react-native';
import * as GIFS from './assets';
import FastImage from 'react-native-fast-image';

interface WelcomeSwiperProps {
  onFinish: () => void;
}

interface CardInfo {
  title: string;
  animation?: ImageRequireSource;
  description: string;
}

const CARDS: CardInfo[] = [
  {
    title: 'Welcome to\nSeeking Safety',
    animation: GIFS.Welcome,
    description:
      'This app was created by Treatment Innovations with funding from the National Institutes of Health (grant R44DA041949).\n\n\n© Treatment Innovations',
  },
  {
    title: 'Empowering',
    animation: GIFS.Empowering,
    description:
      'Inspiration for recovery, new coping skills, compassionate support, online sessions, a safe approach.',
  },
  {
    title: 'Effective',
    animation: GIFS.Effective,
    description: 'Developed at Harvard Medical School.\nPositive results in over 50 studies.',
  },
  {
    title: 'Engaging',
    animation: GIFS.Engaging,
    description: 'New content daily... see your progress... connect with others or pursue your own path.',
  },
];

export const WelcomeSwiper: React.VFC<WelcomeSwiperProps> = (props) => {
  const styles = useWelcomeSwiperStyles();

  const swiperData: SwiperProps = {
    showPagination: true,
    endButtonText: 'NEXT',
    firstButton: ({ goNext }) => (
      <Button style={styles.startButton} onPress={() => goNext()}>
        LET'S START
      </Button>
    ),
    onFinish: props.onFinish,
    data: CARDS.map((info) => <Card {...info} />),
  };

  return <Swiper {...swiperData} />;
};

const Card: React.VFC<CardInfo> = (info) => {
  const styles = useWelcomeSwiperStyles();
  return (
    <View style={styles.mainCard}>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle}>{info.title}</Text>
      </View>
      <View style={styles.cardAnimationContainer}>
        {Platform.OS === 'ios' ? (
          <Image style={styles.cardAnimation} source={info.animation as ImageRequireSource} />
        ) : (
          <FastImage style={styles.cardAnimation} source={info.animation as ImageRequireSource} />
        )}
      </View>
      <View style={styles.cardDescriptionContainer}>
        <Text style={styles.cardDescription}>{info.description}</Text>
      </View>
    </View>
  );
};
