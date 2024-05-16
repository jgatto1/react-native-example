import { useNavigation } from '@react-navigation/native';
import { ProfilePhoto } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import React from 'react';
import { ProfilePhotoAvatars } from 'containers/OnBoarding/ProfileFormSwiper/Photo/Avatars/ProfilePhotoAvatars';
import { useProfileSettingsPhotoContext } from 'containers/Main/Home/ProfileSettings/Photo/context/ProfileSettingsPhoto.context';

export const ProfileSettingsPhotoAvatars = () => {
  const { setPhoto } = useProfileSettingsPhotoContext();
  const navigation = useNavigation();

  const onSelect = (photo: ProfilePhoto) => {
    setPhoto(photo);
    navigation.goBack();
  };

  return <ProfilePhotoAvatars onSelect={onSelect} onClose={() => navigation.goBack()} />;
};
