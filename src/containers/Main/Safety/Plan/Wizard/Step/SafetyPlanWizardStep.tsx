import { Dimensions, Platform, Pressable, ScrollView, View } from 'react-native';
import React, { createRef, useCallback, useState } from 'react';
import { useSafetyPlanWizardStepStyles } from './SafetyPlanWizardStep.styles';
import { Button, Card, Divider, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import { useTheme } from 'providers/theme/ThemeProvider';
import { SVG } from './assets';
import { Picker, PickerRef } from 'components/Picker/Picker';
import { SafetyPlan } from 'model/backend/safety';
import { useFocusEffect } from '@react-navigation/native';

interface SafetyPlanWizardStepProps {
  step: number;
  type: StepType;
  title: string;
  subtitle: string;
  onContinue: (data: SafetyPlan) => void;
  onBack: () => void;
}

export enum StepType {
  MILD,
  MODERATE,
  SERIOUS,
  COPING,
}

type Methods = Pick<SafetyPlan, 'method_0' | 'method_1' | 'method_2'>;

export const SafetyPlanWizardStep: React.VFC<SafetyPlanWizardStepProps> = ({
  step,
  type,
  title,
  subtitle,
  onBack,
  onContinue,
}) => {
  const styles = useSafetyPlanWizardStepStyles();
  const theme = useTheme();

  const pickers = [createRef<PickerRef>(), createRef<PickerRef>(), createRef<PickerRef>()];
  const pickerSelected = [useState<number>(), useState<number>(), useState<number>()];
  const texts = [useState<string>(''), useState<string>(''), useState<string>('')];

  const options = OPTIONS[type];
  const templateOption = TITLE[type];

  const buildMethod = (index: 0 | 1 | 2): Partial<Methods> | undefined => {
    const [text] = texts[index];
    if (!text) {
      return;
    }
    const description = `${type === StepType.COPING ? 'Safe Coping Method' : templateOption} #${index + 1}`;
    return { [`method_${index}`]: { text, description } };
  };

  useFocusEffect(
    useCallback(() => {
      pickerSelected.forEach(([, setter]) => setter(undefined));
      texts.forEach(([, setter]) => setter(''));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const callContinue = () => {
    onContinue({
      id: step - 1,
      ...buildMethod(0),
      ...buildMethod(1),
      ...buildMethod(2),
      type: 'safety_plan',
    });
  };

  return (
    <View>
      <View style={[styles.container]}>
        <Text center bold>
          Step {step || '0'}
        </Text>
        <Space margin={3} />
        {Platform.OS === 'android' && (
          <View
            style={{
              width: Dimensions.get('window').width * 0.925,
              borderWidth: 0.8,
              height: 0.5,
              borderColor: theme.main.palette.divider.color,
            }}
          />
        )}
        {Platform.OS !== 'android' && <Divider />}
        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
          <Space margin={8} />
          <Card>
            <Text bold center>
              {title}
            </Text>
            <Space />
            <Text center>{subtitle}</Text>
          </Card>

          {texts.map(([text, setText], index) => (
            <View key={index}>
              <Space margin={10} />
              <View style={styles.selectorContainer}>
                <Text bold>
                  {templateOption} #{index + 1}: Type or select
                </Text>
                <Space />
                <Pressable style={styles.selectorButton} onPress={() => pickers[index].current?.open()}>
                  <Text>Select a {type === StepType.COPING ? 'Safe Coping Method' : 'Red Flag'}</Text>
                  <SVG.ExpandMore fill={theme.main.palette.primary} />
                </Pressable>
                <Space />
                <TextInput
                  value={text}
                  placeholder={'Write something...'}
                  onChangeText={(newText) => setText(newText)}
                />
              </View>
            </View>
          ))}

          <Space margin={15} />
          <View style={[styles.buttonsContainer, step === 1 && styles.buttonsContainerFirst]}>
            {step > 1 && (
              <Button onPress={() => onBack && onBack()} style={styles.backButton} textStyle={styles.backButtonText}>
                BACK
              </Button>
            )}
            <Button onPress={() => callContinue()}>SAVE & CONTINUE</Button>
          </View>
          <Space margin={40} />
        </ScrollView>
      </View>

      {pickers.map((picker, index) => {
        const [actualSelected, setActualSelected] = pickerSelected[index];
        const [, setText] = texts[index];
        return (
          <Picker
            selected={actualSelected}
            key={index}
            ref={picker}
            noOverlay
            items={options.map((label, value) => ({ value, label }))}
            onDone={(optionIndex) => {
              if (typeof optionIndex !== 'number') {
                return;
              }
              setText(options[optionIndex]);
              setActualSelected(optionIndex);
            }}
          />
        );
      })}
    </View>
  );
};

const OPTIONS: { [key in StepType]: string[] } = {
  [StepType.MILD]: [
    'Isolation',
    'Feel Stuck',
    'Cynical / negative',
    'Losing Sleep',
    'Passive',
    'Addiction craving',
    'No motivation',
    'Poor self-care',
  ],
  [StepType.MODERATE]: ['Lying', 'Not taking meds', 'Cancel treatment', 'Physical problem', 'Poor self-care'],
  [StepType.SERIOUS]: [
    'Fights with people',
    'Self-harm',
    'Giving up',
    'Absent from work or school',
    'Destructive behavior',
  ],
  [StepType.COPING]: [
    'Action first, and feeling will follow',
    'Alone is better than a bad relationship',
    'Ask for help',
    'Ask others',
    'Attend treatment',
    'Avoid avoidable suffering',
    'Choose self-respect',
    'Compassion',
    'Create a buffer',
    'Create a new script',
    'Create a new story',
    'Create meaning',
    'Create positive addictions',
    'Cry',
    'Detach from emotional pain (grounding)',
    'Discovery',
    'Do the best you can with what you have',
    'Do the right thing',
    'Examine the evidence',
    'Expect growth to feel uncomfortable',
    'Fight the trigger',
    'Find rules to live by',
    'Focus on now',
    'Get organized',
    'Get others to support your recovery',
    'Go to a meeting',
    'Healing above all',
    'Honesty',
    'Identify the belief',
    "If one way doesn't work, try another",
    'Imagine',
    'Inspire yourself',
    'Integrate the split self',
    'Learn from experience',
    'Leave a bad scene',
    'Let go of destructive relationships',
    'Link trauma and addiction',
    'List your options',
    'Listen to your needs',
    'Make a commitment',
    'Make a decision',
    'Move toward your opposite',
    'Notice the choice point',
    'Notice the cost',
    'Notice the source',
    'Notice what you control',
    'Observe repeating patterns',
    'Pace yourself',
    'Persist',
    'Plan it out',
    'Practice delay',
    'Praise yourself',
    'Pretend you like yourself',
    'Prioritize healing',
    'Protect your body from HIV',
    'Protect yourself',
    'Reach for community resources',
    'Replace destructive activities',
    'Replay the scene',
    'Rethink',
    'Reward Yourself',
    'Say what you really think',
    'Seek understanding, not blame',
    'Self-nurture',
    'Set a boundary',
    'Set a deadline',
    'Set an action plan',
    'Setbacks are not failures',
    'Solve the problem',
    'Soothing talk',
    'Stay safe',
    'Structure your day',
    'Take good care of your body',
    'Take responsibility',
    'Talk yourself through it',
    'Think the consequences',
    'Tolerate the feeling',
    'Trust the process',
    'Try something, anything',
    'Use kinder language',
    'Watch for danger signs',
    "When in doubt, do what's hardest",
    "When in doubt, don't",
    'Work the material',
  ],
};

const TITLE: { [key in StepType]: string } = {
  [StepType.MILD]: 'Mild Red Flag',
  [StepType.MODERATE]: 'Moderate Red Flag',
  [StepType.SERIOUS]: 'Serious Red Flag',
  [StepType.COPING]: 'Safe Coping Skill',
};
