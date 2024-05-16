import { ActivityIndicator, ScrollView, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useSafetyBoomerangStyles } from './SafetyBoomerang.styles';
import { Button, Text } from 'components';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { createStackNavigator } from '@react-navigation/stack';
import { SafetyBoomerangRoutes } from 'containers/Main/Safety/Boomerang/SafetyBoomerang.routes';
import { Space } from 'components/Space/Space';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Boomerang, SafetyBoomerangRes } from 'model/backend/safety';
import { validateResponse } from 'model/backend';
import { SafetyBoomerangCard } from './Card/SafetyBoomerangCard';
import { SafetyBoomerangCreate } from './Create/SafetyBoomerangCreate';
import { BackendClient } from 'service/backend-client.service';

export const SafetyBoomerang: React.VFC = () => {
  const styles = useSafetyBoomerangStyles();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [boomerangs, setBoomerangs] = useState<Boomerang[]>([]);

  useFocusEffect(
    useCallback(() => {
      BackendClient.get<SafetyBoomerangRes>('/boomerangs')
        .then(validateResponse)
        .then((data) => {
          setBoomerangs(data.boomerangs);
        })
        .catch((err) => console.warn('Cannot fetch safety boomerangs', err))
        .finally(() => setLoading(false));
    }, [])
  );

  const removeBoomerang = (boomerangId: number) => {
    const withOutBoomerang = boomerangs.filter(({ id }) => boomerangId !== id);
    setBoomerangs([...withOutBoomerang]);
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Space />
        <Text style={{ lineHeight: 24 }} size={16} center>
          Safety Boomerangs are supportive messages that come back to you at random times or dates you choose.
        </Text>
        <Space />
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate(SafetyBoomerangRoutes.CREATE)}>
            CREATE A NEW BOOMERANG MESSAGE
          </Button>
        </View>
        <Space margin={15} />
        {!!boomerangs.length && (
          <Text bold center>
            Scheduled Boomerangs
          </Text>
        )}
        <Space />
        {loading && <ActivityIndicator />}
        {!loading &&
          !!boomerangs &&
          boomerangs.length > 0 &&
          boomerangs.map((boomerang, index) => (
            <View key={index} style={styles.boomerangContainer}>
              <SafetyBoomerangCard boomerang={boomerang} onCancel={(boomerangId) => removeBoomerang(boomerangId)} />

              <Space margin={15} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

export const SafetyBoomerangStack = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator initialRouteName={SafetyBoomerangRoutes.MENU}>
      <Stack.Screen
        options={optionsFor('Safety Boomerang')}
        name={SafetyBoomerangRoutes.MENU}
        component={SafetyBoomerang}
      />

      <Stack.Screen
        options={optionsFor('Safety Boomerang')}
        name={SafetyBoomerangRoutes.CREATE}
        component={SafetyBoomerangCreate}
      />
    </Stack.Navigator>
  );
};
