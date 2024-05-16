import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import React from 'react';
import { useSafetyPlanStyles } from './SafetyPlan.styles';
import { Button, Card, Text } from 'components';
import { Space } from 'components/Space/Space';
import { useNavigation } from '@react-navigation/native';
import { SafetyPlanRoutes } from 'containers/Main/Safety/Plan/SafetyPlan.routes';
import { useSafetyPlan } from 'containers/Main/Safety/Plan/SafetyPlan.context';
import { useTheme } from 'providers/theme/ThemeProvider';

export const SafetyPlan: React.VFC = () => {
  const styles = useSafetyPlanStyles();
  const navigation = useNavigation();
  const plans = useSafetyPlan();
  const theme = useTheme();

  const hasPlan = Object.keys(plans.plans).length > 0;

  return (
    <SafeAreaView>
      <View style={styles.root}>
        {plans.loading && <ActivityIndicator color={theme.main.palette.primary} />}
        {!plans.loading && !hasPlan && (
          <Card>
            <Text center bold>
              Welcome to the Safety Plan Wizard
            </Text>
            <Space />
            <Text center>
              A <Text bold>Safety Plan</Text> will help you identify your warning signs and ways to respond them.
            </Text>
            <Space />
            <Text center>
              To see and example, tap <Text bold>"Sample Safety Plan."</Text> Or tap <Text bold>Get Started</Text> to
              create your personalized Safety Plan.
            </Text>
            <Space margin={15} />
            <View style={styles.buttons}>
              <Button style={styles.button} noShadow onPress={() => navigation.navigate(SafetyPlanRoutes.WIZARD)}>
                {'       '}GET STARTED{'       '}
              </Button>
              <Space margin={10} />
              <Button style={styles.button} noShadow onPress={() => navigation.navigate(SafetyPlanRoutes.EXAMPLE)}>
                SAMPLE SAFETY PLAN
              </Button>
            </View>
          </Card>
        )}

        {!plans.loading && hasPlan && (
          <>
            <Card style={styles.card}>
              <Space />
              <Text size={16} weight='bold'>
                Welcome to the Safety Plan
              </Text>
              <Space margin={10} />
              <Text size={16} center style={styles.text}>
                A{' '}
                <Text weight='bold' fontStyle='italic'>
                  Safety Plan
                </Text>{' '}
                helps you identify warning signs and ways to respond to them.
              </Text>
              <Space margin={10} />
              <Button onPress={() => navigation.navigate(SafetyPlanRoutes.BEHAVIOUR)}>VIEW SAFETY PLAN</Button>
              <Space />
            </Card>
            <Space margin={15} />
            <View style={styles.buttons}>
              <Button style={styles.button} onPress={() => navigation.navigate(SafetyPlanRoutes.WIZARD)}>
                EDIT PLAN
              </Button>
              <Space margin={10} />
              <Button style={styles.button} onPress={() => navigation.navigate(SafetyPlanRoutes.EXPORT)}>
                EXPORT PLAN
              </Button>
              <Space margin={10} />
              <Button style={styles.button} onPress={() => navigation.navigate(SafetyPlanRoutes.EXAMPLE)}>
                SAMPLE PLAN
              </Button>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
