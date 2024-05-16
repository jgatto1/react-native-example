import React from 'react';
import { useDailyActionQuizModalStyles } from './DailyActionQuizModal.styles';
import { Button, Modal, Space, Text } from 'components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { DailyActionsRoutes as Routes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { useDailyActionQuiz } from 'containers/Main/Home/DailyActions/Quiz/context/DailyActionQuiz.context';
import { BackgroundViewStyles } from 'components/BackgroundView/BackgroundView';
import { useTheme } from 'providers/theme/ThemeProvider';
import { useCohortTopic } from 'containers/Main/Home/CohortTopic.context';

const SunSource = require('./assets/sun.jpg');
const CloudSource = require('./assets/clouds.png');

interface ModalRouteProps {
  correct?: boolean;
  message?: string;
}

export const DailyActionQuizModal: React.VFC = () => {
  const styles = useDailyActionQuizModalStyles();
  const navigation = useNavigation();
  const route = useRoute();
  const cohortTopic = useCohortTopic();
  const quiz = useDailyActionQuiz();
  const theme = useTheme();
  const params = (route.params || {}) as ModalRouteProps;
  const backgroundStyles: BackgroundViewStyles = {
    top: { flex: 37, marginBottom: 240 },
    middle: { flex: 15, backgroundColor: theme.main.palette.other.weeklyTopic.background },
  };
  const modalCardStyles = { position: 'absolute', bottom: 0, left: 0, width: Dimensions.get('window').width * 0.9 };

  const next = () => {
    if (quiz.completed) {
      navigation.navigate(Routes.MODAL_QUIZ_CONGRATS);
    } else {
      navigation.goBack();
    }
  };
  return (
    <Modal
      noAvoidView
      styles={{ card: modalCardStyles }}
      backgroundViewStyles={backgroundStyles}
      onClose={() => navigation.navigate(quiz.menu)}>
      <View style={styles.content}>
        <Image style={styles.image} source={params.correct ? SunSource : CloudSource} />

        <Text weight='bold' size={30}>
          {params.correct ? 'Yes!' : 'Not quite'}
        </Text>

        {params.message && <Text style={styles.message}>{params.message}</Text>}

        <View style={styles.buttonsContainer}>
          <Pressable style={{ zIndex: 1000 }} onPress={() => navigation.navigate(Routes.MENU)}>
            <Button
              style={[styles.button, styles.closeButton]}
              textStyle={[styles.buttonText, styles.buttonCloseText]}
              onPress={() => navigation.navigate(quiz.menu)}>
              DONE
            </Button>
          </Pressable>
          <Pressable style={{ zIndex: 1000 }} onPress={() => next()}>
            <Button style={styles.button} textStyle={styles.buttonText} onPress={next}>
              {quiz.completed ? 'FINISH' : 'NEXT QUESTION'}
            </Button>
          </Pressable>
        </View>
        <Text weight='bold'>You have completed</Text>
        <Text style={styles.counter}>
          {quiz.answered}/{quiz.questions?.length}
        </Text>

        <Text weight='bold'>Questions for the topic: {cohortTopic.dailyActionText}</Text>
        <Space margin={10} />
      </View>
    </Modal>
  );
};
