import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import { useReachOutStyles } from './ReachOut.styles';
import { Space } from 'components/Space/Space';
import { ArrowButton } from 'components/ArrowButton/ArrowButton';
import { useNavigation } from '@react-navigation/native';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';

const BUTTONS = [
  { text: 'Message Group Members', route: ReachOutRoutes.MESSAGES },
  { text: 'Leader Office Hours', route: ReachOutRoutes.LEADER_OFFICE_HOURS },
  { text: 'Social Feed', route: ReachOutRoutes.SOCIAL_FEED },
  { text: 'Special Interest Groups', route: ReachOutRoutes.INTEREST_GROUPS },
  { text: 'My Trusted People', route: ReachOutRoutes.TRUSTED_PEOPLE },
  { text: 'Coping Coach', route: ReachOutRoutes.COPING_COACH },
];

export const ReachOut: React.VFC = () => {
  const styles = useReachOutStyles();
  const navigation = useNavigation();
  const to = (route: ReachOutRoutes) => () => {
    navigation.navigate(route);
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Space />
        <Image style={styles.image} source={require('./assets/illustration.png')} />
        <Space margin={5} />
        {BUTTONS.map(({ route, text }, index) => (
          <View key={index}>
            <Space key={`space-${index}`} margin={5} />
            <ArrowButton
              key={`button-${index}`}
              color={styles.button.color}
              textColor='black'
              text={text}
              onClick={to(route)}
            />
          </View>
        ))}
        <Space />
      </View>
    </ScrollView>
  );
};
