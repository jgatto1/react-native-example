import { ProfilePhotoCamera } from 'containers/OnBoarding/ProfileFormSwiper/Photo/Camera/ProfilePhotoCamera';
import { useProfileSettingsPhotoContext } from 'containers/Main/Home/ProfileSettings/Photo/context/ProfileSettingsPhoto.context';
import { useNavigation } from '@react-navigation/native';
import { ProfilePhoto } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import React from 'react';

export const ProfileSettingsPhotoCamera = () => {
  const photoSettings = useProfileSettingsPhotoContext();
  const navigation = useNavigation();

  const onSelect = (photo: ProfilePhoto) => {
    photoSettings.setPhoto(photo);
    navigation.goBack();
  };

  const onClose = () => navigation.goBack();

  return <ProfilePhotoCamera onClose={onClose} onSelect={onSelect} />;
};
