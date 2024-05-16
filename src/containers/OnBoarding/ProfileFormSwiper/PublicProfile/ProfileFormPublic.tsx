import { Image, Linking, ScrollView, View } from 'react-native';
import React from 'react';
import { useProfileFormPublicStyles } from './ProfileFormPublic.styles';
import { Space, Text } from 'components';
import { useProfileForm } from 'containers/OnBoarding/ProfileFormSwiper/context/ProfileFormContext';
import { SVG } from 'containers/OnBoarding/ProfileFormSwiper/Photo/asset';
import { EMOJIS } from 'containers/OnBoarding/ProfileFormSwiper/About/assets';

interface ProfileFormPublicProps {
  goToEditProfile: () => void;
}

export const ProfileFormPublic: React.VFC<ProfileFormPublicProps> = ({ goToEditProfile }) => {
  const styles = useProfileFormPublicStyles();
  const form = useProfileForm();

  const previewImageSource = form.photo?.source;

  const emotionalStatus = form.aboutMe?.emotionalStatus;

  const showEmotional = form.aboutMe?.public && (emotionalStatus || emotionalStatus === 0);

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text>
          This is how your public profile will appear.{'\n'}
          Make any changes here, the continue to the home screen to get started with Seeking Safety
        </Text>
      </View>
      <View style={styles.profileCardContainer}>
        <View style={styles.avatarInfoContainer}>
          <View style={styles.profilePhoto}>
            {previewImageSource && <Image style={styles.previewImage} source={previewImageSource} />}
            {!previewImageSource && <SVG.EmptyAvatar />}
          </View>
          <View style={styles.nameHeader}>
            <View style={styles.nameContainer}>
              {showEmotional && <Image style={styles.emoji} source={EMOJIS[emotionalStatus as number]} />}
              <Text style={styles.name}>{form.info?.publicName}</Text>
            </View>
            {!!form.aboutMe?.excerpt && (
              <View style={styles.excerptContainer}>
                <Text style={styles.excerpt}>
                  {form.aboutMe?.excerpt}
                  {!form.aboutMe.public && <Text style={styles.notPublic}> (not public)</Text>}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.scrollContent}>
          <Text style={styles.title}>
            My Special Interest Groups
            {!form.groupsPublic && <Text style={styles.notPublic}> (Not public)</Text>}
          </Text>
          {form.groups && form.groups.length && (
            <View style={styles.chipContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {form.groups?.map((group) => (
                  <View style={styles.chip} key={group.id}>
                    <Text key={group.id}>{group.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          {(!form.groups || form.groups.length === 0) && (
            <Text style={styles.noSelected}>No special interest group selected</Text>
          )}
          <Text style={styles.title}>
            More about me
            {!form.aboutMe?.public && <Text style={styles.notPublic}> (Not public)</Text>}
          </Text>
          {!form.aboutMe?.fullText && <Text style={styles.noSelected}>No more about me text</Text>}
          {!!form.aboutMe?.fullText && (
            <ScrollView style={styles.scrollContent}>
              <Text style={styles.fullText}>{form.aboutMe?.fullText}</Text>
            </ScrollView>
          )}
        </View>
        <View style={styles.editContainer}>
          <Text style={styles.editText} onPress={() => goToEditProfile()}>
            Edit Profile
          </Text>
        </View>
      </View>
      <Space />
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text size={14}>
          By tapping{' '}
          <Text bold italic>
            Finish
          </Text>
          , you agreeing to our{' '}
          <Text
            bold
            onPress={() => Linking.openURL('https://www.treatment-innovations.org/ss-app-terms-of-use-policy.html')}>
            Terms
          </Text>{' '}
          and{' '}
          <Text
            bold
            onPress={() =>
              Linking.openURL('https://www.treatment-innovations.org/ss-app-privacy-and-data-policy.html')
            }>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};
