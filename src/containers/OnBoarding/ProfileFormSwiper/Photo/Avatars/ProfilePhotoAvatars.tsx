import { Image, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import { useProfilePhotoAvatarsStyles } from './ProfilePhotoAvatars.styles';
import { Text } from 'components';
import { AVATARS, SVG } from './asset';
import { IconButton } from 'components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'containers/OnBoarding/ProfileFormSwiper/Photo/Avatars/asset/avatars';
import { useProfileForm } from 'containers/OnBoarding/ProfileFormSwiper/context/ProfileFormContext';
import { ProfilePhoto } from 'containers/OnBoarding/ProfileFormSwiper/context/model';

export const ProfilePhotoAvatarsScreen = () => {
  const { setPhoto } = useProfileForm();
  const navigation = useNavigation();

  const onSelect = (photo: ProfilePhoto) => {
    setPhoto(photo);
    navigation.goBack();
  };

  return <ProfilePhotoAvatars onSelect={onSelect} onClose={() => navigation.goBack()} />;
};

interface ProfilePhotoAvatarsProps {
  onSelect: (photo: ProfilePhoto) => void;
  onClose: () => void;
}

export const ProfilePhotoAvatars: React.VFC<ProfilePhotoAvatarsProps> = ({ onSelect, onClose }) => {
  const styles = useProfilePhotoAvatarsStyles();

  const close = () => {
    onClose();
  };

  async function select(avatar: Avatar) {
    const base64 = await avatar.getBase64().catch((err) => {
      console.error(err);
      return null;
    });
    if (!base64) {
      return;
    }
    const source = avatar.source;
    onSelect({ source, base64 });
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.titleContainer}>
          <View style={styles.backButtonContainer}>
            <IconButton onPress={() => close()} style={styles.backButton}>
              <SVG.Close />
            </IconButton>
          </View>
          <Text>Avatar Library</Text>
        </View>
        <View style={styles.avatarsContainer}>
          <ScrollView contentContainerStyle={styles.avatarsScrollContainer} showsVerticalScrollIndicator={false}>
            {AVATARS.map((avatar, index) => (
              <Pressable key={`avatar-pressable-${index}`} onPress={() => select(avatar)}>
                <Image style={styles.avatar} key={`avatar-${index}`} source={avatar.source} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};
