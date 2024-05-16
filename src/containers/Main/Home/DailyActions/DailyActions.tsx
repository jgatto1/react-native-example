import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import { useDailyActionsStyles } from './DailyActions.styles';
import { ArrowButton } from 'components/ArrowButton/ArrowButton';
import { useNavigation } from '@react-navigation/native';
import { DailyActionsRoutes as Routes } from './DailyActions.stack.routes';
import { useCohortTopic } from '../CohortTopic.context';
import { useDailyActionQuestionContext } from './Question/context/DailyActionQuestion.context';
import { Space, Text } from 'components';

export const DailyActions: React.VFC = () => {
  const styles = useDailyActionsStyles();
  const navigation = useNavigation();
  const { noMore } = useDailyActionQuestionContext();
  const cohortContext = useCohortTopic();
  const topic = cohortContext.currentEvent.topic;

  const to = (route: Routes) => () => {
    navigation.navigate(route);
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Space />
        <Image style={styles.image} source={require('./assets/DailyIllustration.png')} />

        <Space margin={10} />
        <ArrowButton disabled={cohortContext.loading} text={'Daily Safety Check'} onClick={to(Routes.CHECK)} />

        <Space margin={10} />
        <ArrowButton
          disabled={cohortContext.loading}
          text={
            <Text>
              Daily Safety Reflection: <Text italic>{topic?.name}</Text>
            </Text>
          }
          onClick={to(Routes.REFLECTION)}
        />

        <Space margin={10} />
        <ArrowButton
          disabled={cohortContext.loading || noMore}
          text={
            <Text>
              Daily Question: <Text italic>{noMore ? 'COMPLETED' : topic?.name}</Text>
            </Text>
          }
          onClick={to(Routes.QUESTION)}
        />
        <Space />
      </View>
    </ScrollView>
  );
};
