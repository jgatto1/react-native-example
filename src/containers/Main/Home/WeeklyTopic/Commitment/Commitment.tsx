import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Card, Space, Text, TextInput } from 'components';
import { useCommitmentStyles } from './Commitment.styles';
import { useCohortTopic } from '../../CohortTopic.context';
import {
  CommitmentUsedProps,
  HOW_TO_COPE_WITH_CHALLENGES,
  HOW_YOU_FEEL_IF_COMPLETED,
  NEW_COMMITMENT,
  useCommitmentContext,
  WHAT_CHALLENGES,
  WHY_IS_IMPORTANT,
} from './Commitment.context';
import { useNavigation } from '@react-navigation/core';
import { WeeklyTopicRoutes } from '../WeeklyTopic.stack.routes';
import { useTheme } from 'providers/theme/ThemeProvider';
import { ScrollView } from 'react-native-gesture-handler';

export const Commitment = () => {
  const navigation = useNavigation();
  const { currentEvent } = useCohortTopic();
  const { commitmentData, onCommitmentChange, onCommitmentCreate, onCommitmentComplete, hasCommited } =
    useCommitmentContext();
  const theme = useTheme();
  const styles = useCommitmentStyles();

  const postCommitment = (isPublic: boolean) => {
    if (validForm()) {
      onCommitmentCreate(isPublic);
    }
  };

  const validForm = () => {
    return true;
  };

  const handleChange = (value: string, key: CommitmentUsedProps) => {
    onCommitmentChange(key, value);
  };

  const completeCommitment = () => {
    onCommitmentComplete()
      .then((_) => navigation.navigate(WeeklyTopicRoutes.MODAL))
      .catch((err) => {
        console.warn('Can not complete commitment', err);
        navigation.navigate(WeeklyTopicRoutes.MENU);
      });
  };

  return (
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : -120}>
      <ScrollView>
        <View style={styles.root}>
          <Card style={styles.weekCard}>
            <Text style={styles.weekText}>
              This week's topic: <Text italic>{currentEvent.topic.name}</Text>
            </Text>
          </Card>

          <View style={styles.question}>
            <Text size={16}>{NEW_COMMITMENT}</Text>
            {hasCommited ? (
              <>
                <Space margin={4} />
                <Text size={15} bold>
                  {commitmentData.promise}
                </Text>
              </>
            ) : (
              <TextInput
                style={styles.input}
                onChange={(value) => handleChange(value.nativeEvent.text, 'promise')}
                placeholder='Write something...'
                placeholderTextColor={theme.main.palette.other.login.placeholder}
              />
            )}
          </View>
          <Space />
          <View style={styles.question}>
            <Text size={16}>{WHY_IS_IMPORTANT}</Text>
            {hasCommited ? (
              <>
                <Space margin={4} />
                <Text size={15} bold>
                  {commitmentData.reason}
                </Text>
              </>
            ) : (
              <TextInput
                style={styles.input}
                onChange={(value) => handleChange(value.nativeEvent.text, 'reason')}
                placeholder='Write something...'
                placeholderTextColor={theme.main.palette.other.login.placeholder}
              />
            )}
          </View>
          <Space />
          <View style={styles.question}>
            <Text size={16}>{WHAT_CHALLENGES}</Text>
            {hasCommited ? (
              <>
                <Space margin={4} />
                <Text size={15} bold>
                  {commitmentData.plan_a}
                </Text>
              </>
            ) : (
              <TextInput
                style={styles.input}
                onChange={(value) => handleChange(value.nativeEvent.text, 'plan_a')}
                placeholder='Write something...'
                placeholderTextColor={theme.main.palette.other.login.placeholder}
              />
            )}
          </View>
          <Space />
          <View style={styles.question}>
            <Text size={16}>{HOW_TO_COPE_WITH_CHALLENGES}</Text>
            {hasCommited ? (
              <>
                <Space margin={4} />
                <Text size={15} bold>
                  {commitmentData.plan_b}
                </Text>
              </>
            ) : (
              <TextInput
                style={styles.input}
                onChange={(value) => handleChange(value.nativeEvent.text, 'plan_b')}
                placeholder='Write something...'
                placeholderTextColor={theme.main.palette.other.login.placeholder}
              />
            )}
          </View>
          <Space />
          <View style={styles.question}>
            <Text size={16}>{HOW_YOU_FEEL_IF_COMPLETED}</Text>
            {hasCommited ? (
              <>
                <Space margin={4} />
                <Text size={15} bold>
                  {commitmentData.reward}
                </Text>
              </>
            ) : (
              <TextInput
                style={styles.input}
                onChange={(value) => handleChange(value.nativeEvent.text, 'reward')}
                placeholder='Write something...'
                placeholderTextColor={theme.main.palette.other.login.placeholder}
              />
            )}
          </View>
          <Space />
          {!hasCommited ? (
            <View style={styles.postButtons}>
              <Button style={styles.shareButton} onPress={() => postCommitment(false)}>
                FOR YOU
              </Button>
              <Space horizontal />
              <Button style={styles.shareButton} onPress={() => postCommitment(true)}>
                SHARE
              </Button>
            </View>
          ) : (
            <View>
              {!commitmentData.is_completed ? (
                <Button onPress={completeCommitment}>I'VE COMPLETED THIS COMMITMENT</Button>
              ) : (
                <Button disabled onPress={() => null}>
                  COMMITMENT COMPLETED
                </Button>
              )}
              <Space margin={8} />
              {!commitmentData.is_completed && (
                <Button light onPress={() => navigation.goBack()}>
                  I WILL DO THIS LATER
                </Button>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
