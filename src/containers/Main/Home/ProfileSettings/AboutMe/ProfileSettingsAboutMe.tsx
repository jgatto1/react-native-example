import { Image, Pressable, SafeAreaView, ScrollView, Switch, View } from 'react-native';
import React, { useState } from 'react';
import { useProfileSettingsAboutMeStyles } from './ProfileSettingsAboutMe.styles';
import { Button, Card, Text } from 'components';
import { TextInput } from 'components/TextInput/TextInput';
import { EMOJIS } from 'containers/OnBoarding/ProfileFormSwiper/About/assets';
import { useTheme } from 'providers/theme/ThemeProvider';
import { useProfileFormAboutStyles } from 'containers/OnBoarding/ProfileFormSwiper/About/ProfileFormAbout.styles';
import { Space } from 'components/Space/Space';
import { TextLink } from 'components/Text/TextLink';
import { useNavigation } from '@react-navigation/native';
import { ProfileSettingsRoutes } from 'containers/Main/Home/ProfileSettings/ProfileSettings.routes';
import { useProfileSettingsAboutMeGroups } from 'containers/Main/Home/ProfileSettings/AboutMe/Groups/ProfileSettingsAboutMeGroups.context';
import { BackendClient } from 'service/backend-client.service';
import { User } from 'model/backend/login';
import { F, Res, validateResponse } from 'model/backend';
import { useSession } from 'providers/session/SessionProvider';
import { UserSettings } from 'model/backend/user.settings';

export const ProfileSettingsAboutMe: React.VFC = () => {
  const baseStyles = useProfileSettingsAboutMeStyles();
  const theme = useTheme();
  const externalStyles = useProfileFormAboutStyles();
  const navigation = useNavigation();
  const session = useSession();

  const styles = { ...baseStyles, ...externalStyles };

  const [aboutMe, setAboutMe] = useState(session.data?.user.settings.about_me_short || '');
  const [aboutMeFull, setAboutMeFull] = useState(session.data?.user.settings.about_me_long || '');
  const [emotionalStatus, setEmotionalStatus] = useState(Number(session.data?.user.settings.emotional_status) + 1 || 0);
  const [aboutMePublic, setAboutMePublic] = useState(!session.data?.user.settings.hide_about_me);

  const groupsData = useProfileSettingsAboutMeGroups();

  const [updating, setUpdating] = useState(false);

  const saveAboutMe = () => {
    const userId = session.userUUID;
    if (!userId) {
      return;
    }
    setUpdating(true);
    const data: Partial<UserSettings> = {
      about_me_long: aboutMeFull,
      about_me_short: aboutMe,
      emotional_status: emotionalStatus - 1,
      hide_about_me: !aboutMePublic,
    };
    BackendClient.put<Res<F<'user', User>>>(`/user/${userId}/settings`, data)
      .then(validateResponse)
      .then(({ user }) => {
        session.updateUserData(user);
        navigation.goBack();
      })
      .catch((err) => {
        console.warn('Cannot update about me data from profile settings', err);
      })
      .finally(() => setUpdating(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <Space />
          <Card plain>
            <View style={styles.textContainer}>
              <Text style={styles.description}>
                Describe your safety goals and a bit about yourself to the app community. If you make About Me public,
                what you share here will be visible to other app members.
              </Text>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                autoFocus
                placeholder='Tell about yourself in 50 character or less'
                placeholderTextColor='grey'
                maxLength={50}
                onChangeText={(text) => setAboutMe(text)}
                value={aboutMe}
              />
              <TextInput
                autoFocus
                placeholder='Tell some more about yourself in 500 characters or less'
                placeholderTextColor='grey'
                maxLength={500}
                onChangeText={(text) => setAboutMeFull(text)}
                value={aboutMeFull}
                multiline
                style={styles.fullText}
              />
              <Space />
              <Text style={styles.formText}>Emotional status</Text>
              <Text style={styles.emotionalStatusText}>Add an emoji if you want to show your emotion status.</Text>
              <View style={styles.emojiContainer}>
                <View style={styles.selectedEmojiContainer}>
                  {(!!emotionalStatus || emotionalStatus === 0) && (
                    <Image
                      style={[styles.emoji, styles.selectedEmoji]}
                      key={emotionalStatus}
                      source={EMOJIS[emotionalStatus - 2]}
                    />
                  )}
                </View>
                <View style={[styles.emojis, styles.emojiContainerWithoutBorder]}>
                  {EMOJIS.map((emojiSource, index) => (
                    <Pressable key={index} onPress={() => setEmotionalStatus(index + 2)}>
                      <Image key={index} style={styles.emoji} source={emojiSource} />
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.publicSwitchContainer}>
              <TextLink size={12} onPress={() => setEmotionalStatus(0)}>
                Remove
              </TextLink>
              <View style={styles.publicContainer}>
                <Text style={styles.publicSwitchText}>Make About Me public</Text>
                <Switch
                  accessibilityRole='button'
                  trackColor={{ true: theme.main.palette.primary }}
                  value={aboutMePublic}
                  onValueChange={() => setAboutMePublic(!aboutMePublic)}
                  style={styles.publicSwitch}
                />
              </View>
            </View>
            <Space />
            <Text weight='bold'>
              My Special Interest Groups
              {!groupsData.isPublic && (
                <Text size={11} weight='200'>
                  {' '}
                  (Not public)
                </Text>
              )}
            </Text>
            <Space margin={8} />
            {!!groupsData.groups && groupsData.groups.length > 0 && (
              <View style={styles.chipContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {groupsData.groups?.map((group, index) => (
                    <View style={[styles.chip, !index ? styles.firstChip : {}]} key={group.id}>
                      <Text size={12} key={group.id}>
                        {group.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            {(!groupsData.groups || groupsData.groups.length === 0) && (
              <Text style={styles.noSelected}>No special interest group selected</Text>
            )}
            <Space />
            <View style={styles.editGroupsContainer}>
              <TextLink size={12} onPress={() => navigation.navigate(ProfileSettingsRoutes.GROUPS)}>
                Edit Special Interest Groups
              </TextLink>
            </View>
          </Card>
          <Space />
          <View style={styles.saveButtonContainer}>
            <Button loading={updating} onPress={() => saveAboutMe()}>
              SAVE
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
