import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDailyActionQuizStyles } from './DailyActionQuiz.styles';
import { Button, Card, Space, Text } from 'components';
import { Question, QuestionRespondRes, QuestionType } from 'model/backend/quiz';
import { Divider } from 'components/Divider/Divider';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { useNavigation } from '@react-navigation/native';
import { useDailyActionQuiz } from 'containers/Main/Home/DailyActions/Quiz/context/DailyActionQuiz.context';
import { validateResponse } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';

interface DailyActionQuizProps {
  flag?: boolean;
}

const TITLE = {
  [QuestionType.CATEGORIZE]: 'Tap the items that belong in each column',
  [QuestionType.TRUE_FALSE]: 'True or False',
  [QuestionType.MULTIPLE_CHOICE]: 'Multiple Choice',
  [QuestionType.FILL_BLANK]: 'Fill in the Blanks',
};

interface QuestionWithAnswer extends Question {
  selected: number[];
}

const LETTER = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

export const DailyActionQuiz: React.VFC<DailyActionQuizProps> = () => {
  const styles = useDailyActionQuizStyles();
  const { questions, update } = useDailyActionQuiz();
  const [question, setQuestion] = useState<QuestionWithAnswer>();
  const navigation = useNavigation();

  useEffect(() => {
    if (!questions) {
      return;
    }
    const toRespond = questions.filter((q) => q.responded_correctly === null) || [];
    if (!toRespond.length) {
      navigation.navigate(DailyActionsRoutes.MODAL_QUIZ, { congrats: true });
    } else {
      setQuestion({ ...toRespond[0], selected: [] });
    }
  }, [navigation, questions]);

  const select = (index: number) => {
    if (!question) {
      return;
    }
    if (question.type === QuestionType.TRUE_FALSE || question.type === QuestionType.FILL_BLANK) {
      question.selected = [index];
    }
    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      question.selected = selected(index)
        ? question.selected?.filter((c) => c !== index)
        : [...(question.selected || []), index];
    }
    if (question.type === QuestionType.CATEGORIZE) {
      const isSelected = selected(index);
      const opposite = index + (index % 2 === 0 ? 1 : -1);
      if (isSelected) {
        const toDelete = new Set([opposite, index]);
        question.selected = question?.selected?.filter((i) => !toDelete.has(i));
      } else {
        question.selected = question?.selected?.filter((i) => i !== opposite);
        question.selected = [...(question.selected || []), index];
      }
    }
    setQuestion({ ...question });
  };

  const selected = (index: number) => {
    return !!question?.selected?.includes(index);
  };

  const ChoiceButton: React.FC<{ small?: boolean; index: number; center?: boolean }> = (props) => {
    return (
      <Button
        noShadow
        style={[styles.button, props.small && styles.smallButton, selected(props.index) && styles.buttonSelected]}
        textStyle={[
          styles.buttonText,
          props.center && styles.buttonTextCenter,
          selected(props.index) && styles.buttonSelectedText,
        ]}
        onPress={() => select(props.index)}>
        {props.children}
      </Button>
    );
  };

  const seeAnswer = () => {
    if (!questions || !question) {
      return;
    }
    const correct =
      JSON.stringify(question.correct_choice_indexes.sort()) === JSON.stringify(question.selected?.sort());
    const message = correct ? question.text_if_correct : question.text_if_incorrect;

    navigation.navigate(DailyActionsRoutes.MODAL_QUIZ, {
      correct,
      message,
    });

    // mockOkReq({ question: { ...question } })
    BackendClient.put<QuestionRespondRes>(`/question/${question.id}/respond`, { is_correct: correct })
      .then(validateResponse)
      .then((data) => update({ ...data.question }))
      .catch((err) => console.warn(`Cannot respond question ${question.id}`, err));
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.rootSafe}>
        <Card style={styles.card}>
          {!question && (
            <>
              <Text>Loading...</Text>
              <ActivityIndicator color={'grey'} />
            </>
          )}
          {question && (
            <>
              <Text weight='bold' size={16}>
                {TITLE[question.type]}
              </Text>
              <Space margin={8} />
              <Text style={styles.questionText}>{question.question}</Text>
              <Space />
              <Divider style={{ borderWidth: 0.5 }} margin={15} />
              {question.type === QuestionType.TRUE_FALSE &&
                question.choices.map((choice, index) => (
                  <ChoiceButton key={index} index={index}>
                    {choice}
                  </ChoiceButton>
                ))}

              {(question.type === QuestionType.FILL_BLANK || question.type === QuestionType.MULTIPLE_CHOICE) && (
                <View style={styles.optionsContainer}>
                  {question.choices.map((choice, index) => (
                    <View key={index} style={styles.choiceView}>
                      <Text style={styles.letter}>{LETTER[index]})</Text>
                      <ChoiceButton small key={index} index={index}>
                        {choice}
                      </ChoiceButton>
                    </View>
                  ))}
                </View>
              )}

              {question.type === QuestionType.CATEGORIZE && (
                <View style={styles.categorizeContainer}>
                  <View style={styles.categorizeColumn}>
                    <Text style={styles.categorizeColumnTitle} weight='bold'>
                      {question.label_a}
                    </Text>
                    {question.choices
                      .map((choice, index) => ({ choice, index: index * 2 }))
                      .map(({ choice, index }) => (
                        <ChoiceButton center key={index} index={index}>
                          {choice}
                        </ChoiceButton>
                      ))}
                  </View>
                  <Divider vertical margin={10} />
                  <View style={styles.categorizeColumn}>
                    <Text style={styles.categorizeColumnTitle} weight='bold'>
                      {question.label_b}
                    </Text>
                    {question.choices
                      .map((choice, index) => ({ choice, index: index * 2 + 1 }))
                      .map(({ choice, index }) => (
                        <ChoiceButton center key={index} index={index}>
                          {choice}
                        </ChoiceButton>
                      ))}
                  </View>
                </View>
              )}
            </>
          )}
        </Card>
        <Button
          style={styles.buttonAnswer}
          disabled={!question?.selected || question?.selected.length === 0}
          onPress={seeAnswer}>
          SEE ANSWER
        </Button>
        <Space />
      </SafeAreaView>
    </View>
  );
};
