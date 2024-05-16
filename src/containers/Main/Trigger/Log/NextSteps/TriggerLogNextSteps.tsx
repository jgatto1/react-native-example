import { ActivityIndicator, ScrollView, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTriggerLogNextStepsStyles } from './TriggerLogNextSteps.styles';
import { Button, Card, Checkbox, Text } from 'components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TriggerIncident } from 'model/backend/trigger-incident';
import { Space } from 'components/Space/Space';
import { BackendClient } from 'service/backend-client.service';
import { TriggerPrepRes } from 'model/backend/trigger-prep';
import { validateResponse } from 'model/backend';
import {
  ACTIONS,
  TriggerAction,
  TriggerActions,
} from 'containers/Main/Trigger/shared/CustomizePrep/TriggerCustomizePrep.tags';
import { TriggerRoutes } from 'containers/Main/Trigger/Trigger.routes';
import { TriggerLogRoutes } from 'containers/Main/Trigger/Log/TriggerLog.routes';

export const TriggerLogNextSteps: React.VFC = () => {
  const styles = useTriggerLogNextStepsStyles();
  const navigation = useNavigation();
  const route = useRoute();

  const [actions, setActions] = useState<TriggerActions[]>([]);
  const [selectedActions, setSelectedActions] = useState<TriggerAction[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    BackendClient.get<TriggerPrepRes>('/trigger_prep')
      .then(validateResponse)
      .then((res) => {
        if (
          !res.trigger_prep ||
          (res.trigger_prep.safety_actions.length === 1 && res.trigger_prep.safety_actions[0] === '')
        ) {
          setActions(ACTIONS);
          setSelectedActions(ACTIONS.map(({ items }) => items).reduce((acc, act) => [...acc, ...act]));
        } else {
          const prepMessages = ACTIONS.map((message) => {
            return {
              title: message.title,
              items: message.items.filter((i) => res.trigger_prep.safety_actions.includes(i.label)),
            };
          }).filter((message) => message.items.length);
          setActions(prepMessages);
          setSelectedActions(prepMessages.map(({ items }) => items).reduce((acc, act) => [...acc, ...act]));
        }
        setLoading(false);
      });
  }, []);

  // @ts-ignore
  const incident: TriggerIncident = route.params?.incident as TriggerIncident;
  if (!incident) {
    return <></>;
  }

  const hasTags = incident.tags.length > 0 && incident.tags[0] !== '';

  const handleCheckFor = (action: TriggerAction) => (enable?: boolean) => {
    const updated = selectedActions.filter((a) => a.label !== action.label);
    setSelectedActions([...updated, ...(enable ? [action] : [])]);
  };

  return (
    <ScrollView style={styles.root}>
      <Space />
      <Card>
        <Text bold center>
          You've Logged A Trigger Of Severity Level {incident.severity}
          {hasTags && ` with tag names: ${incident.tags.join(', ')}`}
        </Text>
        <Space />
        <Text center>What steps would help you the most now?</Text>
        <Space />
        <Text center size={11}>
          Tap all that apply
        </Text>
        <Space />
        {loading && <ActivityIndicator color='gray' />}
        {!loading && (
          <>
            {actions.map(({ title, items }, index) => (
              <View key={index}>
                <Text bold center>
                  {title}
                </Text>
                {items.map((action, indexAction) => (
                  <View style={styles.checkboxContainer} key={`${index}-${indexAction}`}>
                    <Checkbox
                      isChecked={true}
                      // bounceFriction={1000000}
                      // size={25}
                      // iconStyle={styles.checkbox}
                      onPress={handleCheckFor(action)}
                    />
                    <Text>{action.label}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}
      </Card>
      <Space margin={10} />
      <View style={styles.buttons}>
        <Button
          textStyle={styles.cancelButtonText}
          style={styles.cancelButton}
          onPress={() => navigation.navigate(TriggerRoutes.MENU)}>
          CANCEL
        </Button>
        <Button
          horizontalButtonPadding={10}
          onPress={() => navigation.navigate(TriggerLogRoutes.NEXT_STEPS_ACTIONS, { actions: selectedActions })}>
          NEXT
        </Button>
      </View>
    </ScrollView>
  );
};
