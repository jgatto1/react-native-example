import { ScrollView, View } from 'react-native';
import React from 'react';
import { useSafetyPlanViewCopingStyles } from './SafetyPlanViewCoping.styles';
import { Button, Card, Divider, NewPost, Text } from 'components';
import { useSafetyPlan } from 'containers/Main/Safety/Plan/SafetyPlan.context';
import { Space } from 'components/Space/Space';
import { SafetyPlanRoutes } from 'containers/Main/Safety/Plan/SafetyPlan.routes';
import { useNavigation } from '@react-navigation/native';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';

export const SafetyPlanViewCoping: React.VFC = () => {
  const styles = useSafetyPlanViewCopingStyles();
  const navigation = useNavigation();
  const plans = useSafetyPlan();

  const coping = plans.selected?.value?.coping;

  const texts = [coping?.method_0?.text, coping?.method_1?.text, coping?.method_2?.text];

  return (
    <ScrollView>
      <View style={styles.root}>
        <Card style={styles.card}>
          <Text size={15} center style={{ lineHeight: 24 }}>
            Here are coping skills you identified for{'\n'}
            <Text bold>{plans.selected?.key} Danger</Text>
          </Text>
          <Divider style={styles.divider} />
          <Space margin={4} />
          {texts.map((text, indexText) => (
            <View style={styles.exampleContainer} key={indexText}>
              <Text size={15} center>
                {text}
              </Text>
              <Space margin={4} />
              <Divider style={styles.divider} />
              <Space margin={4} />
            </View>
          ))}
        </Card>

        <Space margin={15} />

        <Card>
          <NewPost
            minimized
            titleCenter
            origin='Safety Plan'
            placeholder={'Write something...'}
            styleContainer={styles.newPost}
            title={'Does this plan work for you?\nReflect on your safety plan here'}
            onSubmitNavigateRoute={SafetyPlanRoutes.MENU}
          />
        </Card>
        <Space margin={15} />
        <View style={styles.exportPlan}>
          <Button onPress={() => navigation.navigate(SafetyPlanRoutes.EXPORT)}>EXPORT PLAN TO AN EMAIL</Button>
          <Space />
          <Button onPress={() => navigation.navigate(ReachOutRoutes.TRUSTED_PEOPLE)}>CONTACT TRUSTED PEOPLE</Button>
          <Space />
          <Button onPress={() => navigation.navigate(SafetyPlanRoutes.MENU)}>DONE</Button>
        </View>
        <Space margin={10} />
      </View>
    </ScrollView>
  );
};
