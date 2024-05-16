import { Linking, ScrollView, View } from 'react-native';
import React from 'react';
import { useTriggerLogNextStepsActionsStyles } from './TriggerLogNextStepsActions.styles';
import { Button, Card, Text } from 'components';
import { Space } from 'components/Space/Space';
import { TriggerRoutes } from 'containers/Main/Trigger/Trigger.routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TriggerAction } from 'containers/Main/Trigger/shared/CustomizePrep/TriggerCustomizePrep.tags';

export const TriggerLogNextStepsActions: React.VFC = () => {
  const styles = useTriggerLogNextStepsActionsStyles();
  const navigation = useNavigation();
  const route = useRoute();

  // @ts-ignore
  const selectedActions: TriggerAction[] = route.params?.actions || [];

  const pressAction = async (action: TriggerAction) => {
    if (action.external) {
      await Linking.openURL(action.route).catch((err) => console.warn('Cannot open external link', err));
    } else {
      navigation.navigate(action.route, action.params);
    }
  };

  return (
    <ScrollView style={styles.root}>
      <Space />
      <Card>
        <Text bold center>
          These links will take you to the areas you've selected
        </Text>
        <Space />
        <Text>Tap whichever one you want to go to first.</Text>
        <Space />
        <View style={styles.actionButtons}>
          {selectedActions.map((action, index) => (
            <View key={index}>
              <Button
                horizontalButtonPadding={1}
                textStyle={styles.actionButtonText}
                style={styles.actionButton}
                onPress={() => pressAction(action)}>
                {action.label}
              </Button>
              <Space margin={10} />
            </View>
          ))}
        </View>
      </Card>
      <Space margin={10} />
      <View style={styles.buttons}>
        <Button
          textStyle={styles.cancelButtonText}
          style={styles.cancelButton}
          onPress={() => navigation.navigate(TriggerRoutes.MENU)}>
          CANCEL
        </Button>
        <Button horizontalButtonPadding={10} onPress={() => navigation.navigate(TriggerRoutes.MENU)}>
          DONE
        </Button>
      </View>
    </ScrollView>
  );
};
