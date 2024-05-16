import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useReachOutCopingCoachStyles } from './ReachOutCopingCoach.styles';
import { Button, Card, Text } from 'components';
import { Space } from 'components/Space/Space';
import { User } from 'model/backend/login';
import { BackendClient } from 'service/backend-client.service';
import { F, Res, validateResponse } from 'model/backend';
import { SVG } from './assets';
import { ReachOutCopingCoachModal } from 'containers/Main/ReachOut/CopingCoach/modal/ReachOutCopingCoachModal';
import { DefaultAvatar } from 'components/Avatar/Avatar';

export const ReachOutCopingCoach: React.VFC = () => {
  const styles = useReachOutCopingCoachStyles();

  const [coaches, setCoaches] = useState<User[]>([]);
  const [coach, setCoach] = useState<User>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BackendClient.get<Res<F<'users', User[]>>>('/users', { params: { role: 'coping_coach' } })
      .then(validateResponse)
      .then((res) => {
        setCoaches(res.users);
      })
      .catch((err) => {
        console.warn('Cannot fetch coping coaches', err);
      })
      .finally(() => setLoading(false));
  });

  const moreInfo = (c: User) => {
    setShowForm(false);
    setCoach(c);
  };

  const contact = (c: User) => {
    moreInfo(c);
    setShowForm(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ReachOutCopingCoachModal coach={coach} onClose={() => setCoach(undefined)} form={showForm} />

      <ScrollView style={styles.root}>
        <Space margin={5} />
        <Text size={15} center bold>
          A coping coach can help you:
        </Text>
        <Space margin={10} />
        <Text lineHeight={22} size={15}>
          Practice grounding... Role-play a challenging conversation... Rehearse how to rethink a situation... Address
          recovery question... Talk through if a person or situation is safe for you... Learn new coping skills...
          Create an action plan when you're stuck.
        </Text>

        <Space margin={10} />
        <Text size={15} lineHeight={22}>
          Try it as often as you like and try different coaches!
        </Text>

        <Space margin={10} />
        {loading && <ActivityIndicator color='grey' />}
        {!loading &&
          coaches.map((c, index) => (
            <Card style={styles.card} key={index}>
              <View>
                <DefaultAvatar size={60} />
              </View>
              <View style={styles.cardCenter}>
                <View style={styles.cardContent}>
                  <Text bold size={13}>
                    {c.settings.display_name}
                  </Text>
                  <Text>{c.settings.about_me_short}</Text>

                  <Space margin={10} />
                  <View style={styles.moreInfoContainer}>
                    <Button noShadow onPress={() => moreInfo(c)}>
                      MORE INFO
                    </Button>
                  </View>
                </View>
              </View>
              <Pressable onPress={() => contact(c)}>
                <SVG.Arrow width={50} height={50} fill={styles.arrow.color} />
              </Pressable>
            </Card>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
