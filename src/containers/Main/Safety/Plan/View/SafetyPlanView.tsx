import { Pressable, View } from 'react-native';
import React from 'react';
import { useSafetyPlanViewStyles } from './SafetyPlanView.styles';
import { Button, Card, Divider, Text } from 'components';
import { Space } from 'components/Space/Space';
import { Select, useSafetyPlan } from 'containers/Main/Safety/Plan/SafetyPlan.context';
import { useNavigation } from '@react-navigation/native';
import { SafetyPlanRoutes } from 'containers/Main/Safety/Plan/SafetyPlan.routes';

const SELECTORS = [Select.MILD, Select.MODERATE, Select.SERIOUS];

export const SafetyPlanView: React.VFC = () => {
  const styles = useSafetyPlanViewStyles();
  const navigation = useNavigation();
  const plans = useSafetyPlan();

  return (
    <View style={styles.root}>
      <Space />
      <Card>
        <Text size={15} style={{ lineHeight: 24 }}>
          Select any below that most fits your current situation and access your Safety Plan for it.
        </Text>
      </Card>
      <Space margin={15} />
      <Card>
        <Text center bold size={16}>
          Unsafe Behavior
        </Text>

        <Space />
        <Divider style={{ borderWidth: 0.6 }} />
        <Space />
        {SELECTORS.map((select, index) => (
          <View key={index}>
            <Text size={15} bold>
              {select} Danger
            </Text>
            <Space />
            <Pressable
              onPress={() => plans.select(select)}
              style={[styles.pressable, plans.selected?.key === select && styles.selected]}>
              <Text>
                {Object.keys(plans.plans).length > 0 &&
                  [
                    plans.plans[select]?.flag.method_0?.text,
                    plans.plans[select]?.flag.method_1?.text,
                    plans.plans[select]?.flag.method_2?.text,
                  ]
                    .filter((m) => !!m)
                    .join(', ')}
                {Object.keys(plans.plans).length === 0 && 'Loading...'}
              </Text>
            </Pressable>
            <Space />
          </View>
        ))}
      </Card>
      <Space margin={15} />
      <View style={styles.buttonContainer}>
        <Button disabled={!plans.selected} onPress={() => navigation.navigate(SafetyPlanRoutes.COPING_SKILLS)}>
          CONTINUE
        </Button>
      </View>
    </View>
  );
};
