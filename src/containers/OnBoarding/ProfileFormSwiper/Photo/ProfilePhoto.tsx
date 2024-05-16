import { ActivityIndicator, Image, View } from 'react-native';
import React from 'react';
import { useProfilePhotoStyles } from './ProfilePhoto.styles';
import { Button, Text } from 'components';
import { SVG } from './asset';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { useProfileForm } from 'containers/OnBoarding/ProfileFormSwiper/context/ProfileFormContext';

function launchImageLibrary(): Promise<ImagePickerResponse> {
  const cameraOpts: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    includeBase64: true,
  };
  return new Promise((resolve) => ImagePicker.launchImageLibrary(cameraOpts, (res) => resolve(res)));
}

export const ProfilePhoto: React.VFC = () => {
  const navigation = useNavigation();
  const { setPhoto } = useProfileForm();
  const form = useProfileForm();

  const styles = useProfilePhotoStyles();

  const launchLibrary = async () => {
    setPhoto({ ...form.photo, loading: true });
    const res = await launchImageLibrary().catch((err) => console.error(err));
    if (!res || res.didCancel || res.errorCode || !res.assets) {
      if (form.photo) {
        setPhoto({ ...form.photo });
      }
      return;
    }
    const { uri, base64 } = res.assets[0];
    setPhoto({ source: { uri }, base64 });
  };

  const previewImageSource =
    form.photo &&
    !form.photo.loading &&
    (form.photo.source ? form.photo.source : { uri: `data:image/jpg;base64,${form.photo.base64}` });

  const loadingImage = form.photo && form.photo.loading;

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text>
          Your profile photo will be visible to other app members. Select an avatar if you don't want to use photo.
        </Text>
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.previewContainer}>
          <View style={styles.previewBox}>
            {previewImageSource && <Image style={styles.previewImage} source={previewImageSource} />}
            {!previewImageSource && loadingImage && <ActivityIndicator color={'white'} />}
            {!previewImageSource && !loadingImage && <SVG.EmptyAvatar />}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={() => navigation.navigate('Camera')}>OPEN CAMERA</Button>
          <Button style={styles.buttonMiddle} onPress={() => launchLibrary()}>
            CHOOSE FROM PHOTOS
          </Button>
          <Button onPress={() => navigation.navigate('Avatar')}>CHOOSE FROM AVATARS</Button>
        </View>
      </View>
    </View>
  );
};
