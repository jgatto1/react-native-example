import { Pressable, SafeAreaView, View } from 'react-native';
import React from 'react';
import { useProfileFormAboutMeFullTextStyles } from './ProfileFormAboutMeFullText.styles';
import { useProfileForm } from 'containers/OnBoarding/ProfileFormSwiper/context/ProfileFormContext';
import { useNavigation } from '@react-navigation/native';
import { SVG } from './assets';
import { Button, Text } from 'components';
import { TextInput } from 'components/TextInput/TextInput';

export const ProfileFormAboutMeFullText: React.VFC = () => {
  const styles = useProfileFormAboutMeFullTextStyles();
  const { aboutMe, setAbout } = useProfileForm();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.fullTextView}>
      <View style={styles.fullTextHeaderContainer}>
        <View style={styles.fullTextCloseViewContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <SVG.Close />
          </Pressable>
        </View>
        <Text style={styles.fullTextHeaderText}>About me full text</Text>
      </View>
      <View style={styles.fullTextInputContainer}>
        <View style={styles.fullTextCharCount}>
          <Text style={styles.fullTextCharCountText}>{aboutMe?.fullText?.length || 0}/500</Text>
        </View>
        <TextInput
          style={styles.fullTextInput}
          multiline={true}
          maxLength={500}
          scrollEnabled={true}
          autoFocus={true}
          placeholder='Tell some more about yourself in 500 characters or less'
          onChangeText={(text) => setAbout({ ...aboutMe, fullText: text })}
          value={aboutMe?.fullText || ''}
        />
      </View>
      <View style={styles.fullTextButtonsContainer}>
        <Text onPress={() => setAbout({ ...aboutMe, fullText: undefined })}>Clear</Text>
        <Button onPress={() => navigation.goBack()}>DONE</Button>
      </View>
    </SafeAreaView>
  );
};
