import { SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import { useSafetyPlanExampleStyles } from './SafetyPlanExample.styles';
import { Button, Card, Divider, Text } from 'components';
import { Space } from 'components/Space/Space';
import { useNavigation } from '@react-navigation/native';

const CARDS = [
  {
    title: "You're facing mild danger.\nThese are some coping skills\nyou've identified for mild danger.",
    texts: ["Get a good night's sleep", 'Ask for help', 'Structure your day'],
  },
  {
    title: "You're feeling strong anger.\nThese are some coping skills\nyou've identified for strong anger.",
    texts: ['Let yourself cry', 'Trust the process', 'Replace destructive activities'],
  },
  {
    title:
      "You're experiencing an unsafe situation, using a substance.\nThese are some coping skills\nyou've identified for using a substance.",
    texts: ['Protect your body from HIV', 'Practice delay', 'Leave a bad scene'],
  },
  {
    title: "These are places you've identified as safe places to go.",
    texts: ["My friend Karen's house", 'A coffee shop', 'My room'],
  },
  {
    title: 'These are people you can contact for support.',
    texts: ['Safe People (trough the App)', 'Mom', 'Friend Karen', 'My Sponsor'],
  },
];

export const SafetyPlanExample: React.VFC = () => {
  const styles = useSafetyPlanExampleStyles();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <Card>
            <Space margin={2} />
            <Text size={15} style={{ lineHeight: 24 }}>
              Here is an example of a Safety Plan using the <Text weight='600'>Safety Plan Wizard</Text>. Your plan will
              be customized to your situations and solutions.
            </Text>
            <Space margin={2} />
          </Card>
          {CARDS.map((card, index) => (
            <View key={index}>
              <Space margin={15} />
              <Card style={styles.card}>
                <Text bold center size={15} style={{ lineHeight: 24 }}>
                  {card.title}
                </Text>
                <Space margin={2} />
                <Divider style={styles.divider} />
                <Space margin={2} />
                {card.texts.map((text, indexText) => (
                  <View style={styles.exampleContainer} key={`${index}-${indexText}`}>
                    <Text key={`${index}-${indexText}-text`} center>
                      {text}
                    </Text>
                    <Space margin={2} />
                    <Divider key={`${index}-${indexText}-divider`} style={styles.divider} />
                    <Space margin={2} />
                  </View>
                ))}
              </Card>
            </View>
          ))}
        </View>
        <Space />
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.goBack()}>BACK</Button>
        </View>
        <Space />
      </ScrollView>
    </SafeAreaView>
  );
};
