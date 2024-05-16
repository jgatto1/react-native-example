import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ProfileFormGroups } from 'containers/OnBoarding/ProfileFormSwiper/Groups/ProfileFormGroups';
import { Space } from 'components/Space/Space';
import { Button, Text } from 'components';
import React, { useState } from 'react';
import { useProfileSettingsAboutMeGroups } from 'containers/Main/Home/ProfileSettings/AboutMe/Groups/ProfileSettingsAboutMeGroups.context';
import { useSession } from 'providers/session/SessionProvider';
import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { useNavigation } from '@react-navigation/native';

export const ProfileSettingsAboutMeGroups = () => {
  const sessionGroups = useProfileSettingsAboutMeGroups();
  const session = useSession();
  const navigation = useNavigation();

  const [updatingGroups, setUpdatingGroups] = useState(false);

  const perform = async (action: 'remove' | 'add', ids: number[]) => {
    if (ids.length === 0) {
      return;
    }
    const userId = session.userUUID;
    if (!userId) {
      return;
    }
    const data = { interest_group_ids: ids };
    return BackendClient.put<Res>(`/user/${userId}/interest_groups/${action}`, data).then(validateResponse);
  };

  const performPublic = async () => {
    const userId = session.userUUID;
    if (!userId) {
      return;
    }
    return BackendClient.put(`/user/${userId}/settings`, { hide_interest_groups: !sessionGroups.isPublic }).then(
      validateResponse
    );
  };

  const save = () => {
    const initGroups = sessionGroups.initialGroups || new Set();
    const newGroups = new Set(sessionGroups.groups?.map((g) => g.id) || []);
    const toAdd = (sessionGroups.groups || []).filter((g) => !initGroups.has(g.id)).map((g) => g.id);
    const toRemove = Array.from(initGroups).filter((id) => !newGroups.has(id));
    setUpdatingGroups(true);
    Promise.all([perform('remove', toRemove), perform('add', toAdd), performPublic()])
      .then(() => sessionGroups.setInitialGroups(newGroups))
      .then(() => navigation.goBack())
      .catch((error) => console.warn('Cannot update profile interest groups', error))
      .finally(() => setUpdatingGroups(false));
  };

  return (
    <SafeAreaView>
      <Space />
      {Array.isArray(sessionGroups.groups) && (
        <View style={styles.root}>
          <Text size={14} bold>
            My Special Interest Groups
          </Text>
          <Space margin={10} />
          <View style={styles.formContainer}>
            <ProfileFormGroups
              hideDescription
              alternativeLayout
              isPublic={sessionGroups.isPublic}
              switchPublic={() => sessionGroups.switchIsPublic()}
              setGroups={(groups) => sessionGroups.setGroups(groups)}
              selected={sessionGroups.groups}
            />
          </View>
        </View>
      )}
      <Space margin={-20} />
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonSave} loading={updatingGroups} onPress={() => save()}>
          DONE
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSave: {
    width: 130,
  },
  formContainer: {
    flexDirection: 'row',
  },
});
