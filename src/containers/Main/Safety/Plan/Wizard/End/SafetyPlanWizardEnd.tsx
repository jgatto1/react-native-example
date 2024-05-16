import { ActivityIndicator, Image, View } from 'react-native';
import React from 'react';
import { useSafetyPlanWizardEndStyles } from './SafetyPlanWizardEnd.styles';
import { Button, Divider, Text } from 'components';
import { Space } from 'components/Space/Space';
import { SafetyPlanRoutes } from 'containers/Main/Safety/Plan/SafetyPlan.routes';
import { useNavigation } from '@react-navigation/native';

interface SafetyPlanWizardEndProps {
  updating?: boolean;
  step: number;
  onBack: () => void;
}

export const SafetyPlanWizardEnd: React.VFC<SafetyPlanWizardEndProps> = ({ step, updating, onBack }) => {
  const styles = useSafetyPlanWizardEndStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      {!updating && (
        <>
          <Space margin={5} />
          <Text center bold>
            Step {step || '0'}
          </Text>
          <Space margin={3} />
          <Divider />
          <Space />
          <View style={styles.container}>
            <Text italic size={30} style={styles.title}>
              Super!
            </Text>
            <Space />
            <Image style={styles.image} source={require('./assets/SafetyPlanIllustration.png')} />
            <Space margin={20} />
            <View style={styles.message}>
              <Text>You've completed your Safety Plan.</Text>
            </View>
            <Space margin={20} />
            <View style={styles.buttonsContainer}>
              <Button onPress={() => onBack()}>BACK</Button>
              <Button onPress={() => navigation.navigate(SafetyPlanRoutes.BEHAVIOUR)}>TRY MY PLAN</Button>
            </View>
          </View>
        </>
      )}
      {updating && <ActivityIndicator />}
    </View>
  );
};
