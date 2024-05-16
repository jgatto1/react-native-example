import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useReachOutTrustedPeopleStyles } from './ReachOutTrustedPeople.styles';
import { Space } from 'components/Space/Space';
import { Button, Card, Text } from 'components';
import { TrustedPeopleRes, TrustedPerson } from 'model/backend/trusted-people';
import { useSession } from 'providers/session/SessionProvider';
import { BackendClient } from 'service/backend-client.service';
import { validateResponse } from 'model/backend';
import { SVG } from './assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ReachOutTrustedPeopleRoutes } from 'containers/Main/ReachOut/TrustedPeople/ReachOutTrustedPeople.routes';
import { ReachOutTrustedPeopleEditModal } from 'containers/Main/ReachOut/TrustedPeople/modal/Edit/ReachOutTrustedPeopleEditModal';
import {
  ReachOutTrustedPeopleRequestModal,
  TrustedPersonRequestType,
} from 'containers/Main/ReachOut/TrustedPeople/modal/Request/ReachOutTrustedPeopleRequestModal';

interface ReachOutTrustedPeopleProps {
  flag: boolean;
}

interface TrustedPeople {
  loading?: boolean;
  data: TrustedPerson[];
}

export const ReachOutTrustedPeople: React.VFC<ReachOutTrustedPeopleProps> = () => {
  const styles = useReachOutTrustedPeopleStyles();
  const navigation = useNavigation();
  const session = useSession();

  const [trustedPeople, setTrustedPeople] = useState<TrustedPeople>({ loading: true, data: [] });
  const [selectedToEdit, setSelectedToEdit] = useState<TrustedPerson>();
  const [selectedToRequest, setSelectedToRequest] = useState<TrustedPerson>();
  const [requestType, setRequestType] = useState<TrustedPersonRequestType>('MESSAGE');

  useFocusEffect(
    React.useCallback(() => {
      const user_uuid = session.userUUID;
      BackendClient.get<TrustedPeopleRes>(`/user/${user_uuid}/trusted_people`)
        .then(validateResponse)
        .then((res) => setTrustedPeople({ data: res.trusted_people }))
        .catch((err) => {
          console.warn(`Cannot load trusted people for user ${user_uuid}`, err);
          setTrustedPeople({ data: [] });
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const onEditAction = (action: 'DELETE' | 'EDIT', person: TrustedPerson) => {
    const updatePersons = trustedPeople.data.map((p) =>
      p.uuid === person.uuid ? (action === 'DELETE' ? null : person) : p
    );
    setTrustedPeople({ data: updatePersons.filter((p) => p !== null) as TrustedPerson[] });
  };

  const reqMessage = (p: TrustedPerson) => () => {
    setSelectedToRequest(p);
    setRequestType('MESSAGE');
  };

  const reqCall = (p: TrustedPerson) => () => {
    setSelectedToRequest(p);
    setRequestType('CALL');
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.rootScroll}>
        <ReachOutTrustedPeopleEditModal
          selected={selectedToEdit}
          onClose={() => setSelectedToEdit(undefined)}
          onAction={onEditAction}
        />
        <ReachOutTrustedPeopleRequestModal
          selected={selectedToRequest}
          onClose={() => setSelectedToRequest(undefined)}
          type={requestType}
        />

        <Space margin={10} />
        <Text size={24} italic style={styles.title}>
          My Trusted People
        </Text>
        <Space />
        <Text size={15} lineHeight={22}>
          Select up to 7 contacts as Trusted People. When you want support, tap a button under a name to choose from
          several quick reach-out messages.
        </Text>
        <Space />
        <View style={styles.buttonContainer}>
          <Button
            disabled={trustedPeople.data.length > 7}
            style={styles.addNewButton}
            onPress={() => navigation.navigate(ReachOutTrustedPeopleRoutes.ADD)}>
            + ADD A NEW TRUSTED PERSON
          </Button>
        </View>
        <Space margin={10} />
        {trustedPeople.loading && <ActivityIndicator color='grey' />}
        {!trustedPeople.loading &&
          trustedPeople.data.map((person) => (
            <Card style={styles.personCard} key={person.uuid}>
              <View style={styles.personCardTop}>
                <Text bold>
                  {person.first_name} {person.last_name}
                </Text>
                <Pressable style={styles.editContainer} onPress={() => setSelectedToEdit(person)}>
                  <SVG.Edit width={20} fill={styles.editSvg.color} />
                  <Space horizontal margin={3} />
                  <Text style={styles.editSvg} bold>
                    EDIT
                  </Text>
                </Pressable>
              </View>
              <Space margin={10} />
              <View style={styles.personCardTop}>
                <Pressable style={styles.button} onPress={reqMessage(person)}>
                  <SVG.Message width={30} fill={styles.buttonSvg.color} />
                  <Text style={styles.buttonText}>REQUEST{'\n'}A MESSAGE</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={reqCall(person)}>
                  <SVG.Call width={30} fill={styles.buttonSvg.color} />
                  <Text style={styles.buttonText}>REQUEST{'\n'}A CALL</Text>
                </Pressable>
              </View>
            </Card>
          ))}
      </ScrollView>
    </View>
  );
};
