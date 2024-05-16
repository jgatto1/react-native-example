import { Image, Pressable, Switch, View } from 'react-native';
import React, { useEffect } from 'react';
import { useProfileFormAboutStyles } from './ProfileFormAbout.styles';
import { Text } from 'components';
import { useProfileForm } from 'containers/OnBoarding/ProfileFormSwiper/context/ProfileFormContext';
import { useTheme } from 'providers/theme/ThemeProvider';
import { TextInput } from 'components/TextInput/TextInput';
import { useNavigation } from '@react-navigation/native';
import { EMOJIS } from 'containers/OnBoarding/ProfileFormSwiper/About/assets';

export const ProfileFormAbout: React.VFC = () => {
  const styles = useProfileFormAboutStyles();
  const form = useProfileForm();
  const theme = useTheme();
  const navigation = useNavigation();

  const { emotionalStatus } = form.aboutMe || {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => form.setAbout({ ...form.aboutMe, emotionalStatus: 2 }), []);

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.optionalText}>Optional</Text>
      </View>
      <View style={styles.textContainer}>
        <Text>
          Describe your safety goals and a bit about yourself to the app community. If you make About me public, what
          you share here will be visible to other app members.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formText}>About me excerpt</Text>
        <TextInput
          autoFocus
          placeholder='Tell about yourself in 50 character or less'
          placeholderTextColor='grey'
          maxLength={50}
          onChangeText={(text) => form.setAbout({ ...form.aboutMe, excerpt: text })}
          value={form.aboutMe?.excerpt || ''}
        />
        <Text style={styles.formText}>About me full text</Text>
        <Pressable style={styles.fullTextOpener} onPress={() => navigation.navigate('AboutMe')}>
          <Text
            style={[
              styles.fullTextOpenerPlaceholder,
              !!form.aboutMe?.fullText && styles.fullTextOpenerPlaceholderFilled,
            ]}>
            {form.aboutMe?.fullText?.slice(0, 100) || 'Tell some more about yourself in 500 characters or less'}
          </Text>
        </Pressable>
        <Text style={styles.formText}>Emotional status</Text>
        <Text style={styles.emotionalStatusText}>
          Add an emoji if you want to show your emotion status. You can change it any time.
        </Text>
        <View style={styles.emojiContainer}>
          <View style={styles.selectedEmojiContainer}>
            {(emotionalStatus || emotionalStatus === 0) && (
              <Image
                style={[styles.emoji, styles.selectedEmoji]}
                source={EMOJIS[form.aboutMe?.emotionalStatus as number]}
              />
            )}
          </View>
          <View style={styles.emojis}>
            {EMOJIS.map((emojiSource, index) => (
              <Pressable key={index} onPress={() => form.setAbout({ ...form.aboutMe, emotionalStatus: index })}>
                <Image key={index} style={styles.emoji} source={emojiSource} />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.publicSwitchContainer}>
        <Text style={styles.publicSwitchText}>Make About Me public</Text>
        <Switch
          accessibilityRole='button'
          trackColor={{ true: theme.main.palette.primary }}
          value={form.aboutMe?.public}
          onValueChange={() => form.setAbout({ ...form.aboutMe, public: !form.aboutMe?.public })}
          style={styles.publicSwitch}
        />
      </View>
    </View>
  );
};
