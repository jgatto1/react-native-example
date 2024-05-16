import React, { useEffect, useState } from 'react';
import { useProfileSettingsPhotoStyles } from './ProfileSettingsPhoto.styles';
import { BackgroundView } from 'components/BackgroundView/BackgroundView';
import { Button, Card } from 'components';
import { ActivityIndicator, Image, ImageSourcePropType, SafeAreaView, View } from 'react-native';
import { Space } from 'components/Space/Space';
import { SVG } from 'containers/OnBoarding/ProfileFormSwiper/Photo/asset';
import * as ImagePicker from 'react-native-image-picker';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { TextLink } from 'components/Text/TextLink';
import { useNavigation } from '@react-navigation/native';
import { ProfileSettingsRoutes } from 'containers/Main/Home/ProfileSettings/ProfileSettings.routes';
import { useProfileSettingsPhotoContext } from 'containers/Main/Home/ProfileSettings/Photo/context/ProfileSettingsPhoto.context';
import { useSession } from 'providers/session/SessionProvider';
import { ProfileSettingsPhotoService } from './ProfileSettingsPhoto.service';

function launchImageLibrary(): Promise<ImagePickerResponse> {
  const cameraOpts: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    includeBase64: true,
  };
  return new Promise((resolve) => ImagePicker.launchImageLibrary(cameraOpts, (res) => resolve(res)));
}

export const ProfileSettingsPhoto: React.VFC = () => {
  const styles = useProfileSettingsPhotoStyles();
  const navigation = useNavigation();
  const session = useSession();

  const { photo, setPhoto } = useProfileSettingsPhotoContext();

  const [loading, setLoading] = useState(false);

  const updateAvatar = () => {
    if (!session.userUUID || !photo) {
      return;
    }
    setLoading(true);
    ProfileSettingsPhotoService.updateAvatar(session.userUUID, photo)
      .then((user) => user && session.updateUserData(user))
      .catch((err) => {
        console.warn('Cannot update user profile avatar', err);
      })
      .finally(() => {
        setLoading(false);
        setPhoto({});
        navigation.navigate(ProfileSettingsRoutes.MAIN);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPhoto({}), []);

  const launchLibrary = async () => {
    setPhoto({ ...photo, loading: true });
    const res = await launchImageLibrary().catch((err) => console.error(err));
    if (!res || res.didCancel || res.errorCode || !res.assets) {
      if (photo) {
        setPhoto({ ...photo });
      }
      return;
    }
    const { uri, base64 } = res.assets[0];
    setPhoto({ source: { uri }, base64 });
  };

  const buildSource = (): ImageSourcePropType | null | undefined => {
    if (photo?.loading) {
      return null;
    }
    if (!photo?.base64 && session.data?.user.settings.avatar_url_512) {
      return { uri: session.data?.user.settings.avatar_url_512 };
    }
    return photo && (photo.source ? photo.source : { uri: `data:image/jpg;base64,${photo.base64}` });
  };

  const previewImageSource = buildSource();

  const loadingImage = photo && photo.loading;

  return (
    <BackgroundView>
      <SafeAreaView style={styles.root}>
        <Card>
          <View style={styles.previewContainer}>
            <View style={styles.previewBox}>
              {previewImageSource && <Image style={styles.previewImage} source={previewImageSource} />}
              {!previewImageSource && loadingImage && <ActivityIndicator color={'white'} />}
              {!previewImageSource && !loadingImage && <SVG.EmptyAvatar />}
            </View>
          </View>
          <Space margin={15} />
          <View style={styles.buttonsContainer}>
            <Button onPress={() => navigation.navigate(ProfileSettingsRoutes.CAMERA)}>OPEN CAMERA</Button>
            <Space margin={10} />
            <Button onPress={() => launchLibrary()}>CHOOSE FROM PHOTO LIBRARY</Button>
            <Space margin={10} />
            <Button onPress={() => navigation.navigate(ProfileSettingsRoutes.AVATAR)}>CHOOSE FROM AVATARS</Button>
          </View>
          <Space margin={15} />
          <View style={styles.actionButtons}>
            <TextLink size={12} onPress={() => navigation.goBack()}>
              CANCEL
            </TextLink>
            <Button disabled={loading || !photo?.base64} noShadow onPress={() => updateAvatar()}>
              {loading ? <ActivityIndicator color={'white'} /> : 'SAVE'}
            </Button>
          </View>
        </Card>
      </SafeAreaView>
    </BackgroundView>
  );
};
