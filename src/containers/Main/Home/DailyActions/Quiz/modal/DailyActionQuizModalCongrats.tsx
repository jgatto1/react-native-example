import { useDailyActionQuizModalStyles } from './DailyActionQuizModal.styles';
import { useDailyActionQuiz } from 'containers/Main/Home/DailyActions/Quiz/context/DailyActionQuiz.context';
import { useNavigation } from '@react-navigation/native';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { View } from 'react-native';
import { Button, Modal, Space, Text } from 'components';
import React from 'react';
import { useTheme } from 'providers/theme/ThemeProvider';
import { BackgroundViewStyles } from 'components/BackgroundView/BackgroundView';
import { useCohortTopic } from 'containers/Main/Home/CohortTopic.context';

export const DailyActionQuizModalCongrats = () => {
  const styles = useDailyActionQuizModalStyles();
  const quiz = useDailyActionQuiz();
  const cohortTopic = useCohortTopic();
  const navigation = useNavigation();
  const theme = useTheme();
  const backgroundStyles: BackgroundViewStyles = {
    top: { flex: 28 },
    middle: { flex: 9, backgroundColor: theme.main.palette.other.weeklyTopic.background },
  };
  return (
    <Modal
      styles={{ root: { flex: 1.6 } }}
      backgroundViewStyles={backgroundStyles}
      onClose={() => navigation.navigate(DailyActionsRoutes.MENU)}>
      <View style={styles.content}>
        <Text weight='bold' size={25}>
          Congrats!
        </Text>
        <Space />
        <Space />
        <Text weight='bold'>You have completed</Text>
        <Space />
        <Text style={styles.counter}>
          {quiz.answered}/{quiz.questions?.length}
        </Text>
        <Space />
        <Text weight='bold' center>
          Questions for the topic: {cohortTopic.dailyActionText}
        </Text>
        <Space />
        <Button style={styles.congratsOk} onPress={() => navigation.navigate(DailyActionsRoutes.MENU)}>
          OK
        </Button>
      </View>
    </Modal>
  );
};
