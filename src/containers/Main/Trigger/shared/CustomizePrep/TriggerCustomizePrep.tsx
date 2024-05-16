import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useTriggerCustomizePrepStyles } from './TriggerCustomizePrep.styles';
import { Space } from 'components/Space/Space';
import { Button, Card, Checkbox, Divider, Text } from 'components';
import { ACTIONS, LABELED } from 'containers/Main/Trigger/shared/CustomizePrep/TriggerCustomizePrep.tags';
import { TriggerCustomizePrepTag } from 'containers/Main/Trigger/shared/CustomizePrep/Tag/TriggerCustomizePrepTag';
import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TriggerPrepCreate, TriggerPrepRes } from 'model/backend/trigger-prep';

const sanitize = (list: string[]): string[] => {
  return list.length === 1 && list[0] === '' ? [] : list;
};

export const TriggerCustomizePrep: React.VFC = () => {
  const styles = useTriggerCustomizePrepStyles();
  const navigation = useNavigation();

  const [messages, setMessages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [saving, setSaving] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      BackendClient.get<TriggerPrepRes>('/trigger_prep')
        .then(validateResponse)
        .then((res) => {
          if (!res.trigger_prep) {
            return;
          }
          setMessages(sanitize(res.trigger_prep.safety_actions));
          setTags(sanitize(res.trigger_prep.tags));
        })
        .catch((err) => {
          console.warn('Cannot retrieve user trigger preps', err);
        });
    }, [])
  );

  const handleCheckBoxFor = (message: string) => () => {
    const enable = !checked(message);
    const updated = messages.filter((m) => m !== message);
    setMessages([...updated, ...(enable ? [message] : [])]);
  };

  const handleTagFor = (tag: string) => (enable?: boolean) => {
    const updated = tags.filter((t) => t !== tag);
    setTags([...updated, ...(enable ? [tag] : [])]);
  };

  const checked = (message: string) => {
    return messages.includes(message);
  };

  const tagChecked = (tag: string) => tags.includes(tag);

  const triggersStyleFor = (list: string[]) => {
    return [styles.triggers, list.length === 1 && styles.triggers1, list.length === 2 && styles.triggers2];
  };

  const save = () => {
    setSaving(true);
    const data: TriggerPrepCreate = {
      safety_actions: !messages.length ? [''] : messages,
      tags: !tags.length ? [''] : tags,
    };
    BackendClient.put<Res>('/trigger_prep', data)
      .then(validateResponse)
      .then(() => navigation.goBack())
      .catch((err) => {
        console.warn('Cannot update user trigger preps', err);
      })
      .finally(() => setSaving(false));
  };

  return (
    <ScrollView style={styles.root}>
      <Space />
      <Card>
        <Text bold center>
          Customize your Trigger Coping Message
        </Text>
        <Space margin={10} />
        <Text center lineHeight={22} size={14}>
          When you log a trigger you'll get prompts to take action that can help. Add actions from the list below to
          customize your trigger message.
        </Text>
        <Divider margin={10} style={{ borderWidth: 0.2 }} />
        {ACTIONS.map(({ title, items }, key) => (
          <View key={key} style={styles.messageContainer}>
            <>
              <Space />
              <Text center bold>
                {title}
              </Text>
              <Space />
            </>
            {items
              .map((item) => ({ item, isChecked: checked(item.label) }))
              .map(({ item, isChecked }, index) => (
                <View key={`${key}-${isChecked}-${index}`} style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={isChecked}
                    // bounceFriction={100000}
                    // size={35}
                    disableBuiltInState
                    // iconStyle={styles.checkbox}
                    onPress={handleCheckBoxFor(item.label)}
                  />
                  <Text>{item.label}</Text>
                </View>
              ))}
          </View>
        ))}
      </Card>
      <Space margin={10} />
      <Card>
        <Text bold center>
          Customize your Trigger tags
        </Text>
        <Space margin={10} />
        <Text center size={14} lineHeight={22}>
          When you log a Trigger you can add tags to see patterns over time. Add tags now that are relevant for you so
          you can track them easily if they occur
        </Text>
        <Space margin={10} />
        <Text bold center>
          Choose your Triggers
        </Text>
        <Space margin={10} />
        <Text center size={14} lineHeight={22}>
          A trigger is anything that sets you off-- i.e., creates intense distress or leads you to unsafe behavior, Tap
          to add triggers to your list (yellow) or remove them (green)
        </Text>

        {LABELED.map(({ label, labelTags }, index) => (
          <View key={index}>
            <Space margin={10} />
            {label !== 'Common' && (
              <Text bold center>
                {label} Triggers
              </Text>
            )}
            <View style={triggersStyleFor(labelTags)}>
              {labelTags.map((tag, indexTag) => (
                <TriggerCustomizePrepTag
                  small
                  key={`${label}-${index}-${tag}-${indexTag}`}
                  label={tag}
                  checked={tagChecked(tag)}
                  onChange={handleTagFor(tag)}
                />
              ))}
            </View>
          </View>
        ))}
      </Card>
      <Space margin={15} />
      <View style={styles.saveButtonContainer}>
        <Button loading={saving} onPress={() => save()}>
          SAVE CHANGES
        </Button>
      </View>
      <Space margin={10} />
    </ScrollView>
  );
};
