import { View } from 'react-native';
import React from 'react';
import { useSafetyTalkToSelfStyles } from './SafetyTalkToSelf.styles';
import { Button, Card, Text } from 'components';
import { Space } from 'components/Space/Space';
import { useNavigation } from '@react-navigation/native';
import { SafetyTalkToSelfRoutes } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf.routes';

export const SafetyTalkToSelf: React.VFC = () => {
  const styles = useSafetyTalkToSelfStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <Card>
        <Text bold center>
          Introduction
        </Text>

        <Space margin={10} />

        <Text center>
          The idea is to record your Safe Self (the most positive, recovery-oriented side of you) so that when you're
          not feeling well, you can get back in touch with your Safe Self
        </Text>

        <Space margin={10} />

        <Text bold center>
          Next Steps
        </Text>

        <Space margin={10} />

        <Text center>
          The next few screens will offer questions to bring out your Safe Self. You can respond with audio or writing,
          and also ask supportive people to add to it if you want.
        </Text>

        <Space margin={10} />

        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate(SafetyTalkToSelfRoutes.CREATE)}>START</Button>
        </View>
      </Card>

      <Space margin={15} />

      <Card>
        <Text center bold>
          Listen To Your Safe Self Recording
        </Text>

        <Space margin={10} />

        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate(SafetyTalkToSelfRoutes.LISTEN)}>LISTEN TO SAFE SELF</Button>
        </View>

        <Space margin={5} />
      </Card>
    </View>
  );
};
