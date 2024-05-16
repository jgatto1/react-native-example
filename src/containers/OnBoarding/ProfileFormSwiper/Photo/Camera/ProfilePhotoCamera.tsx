import { ActivityIndicator, Image, Platform, Pressable, SafeAreaView, View } from 'react-native';
import React, { createRef, useState } from 'react';
import { useProfileAndroidPhotoCameraStyle, useProfilePhotoCameraStyles } from './ProfilePhotoCamera.styles';
import { RNCamera, RNCameraProps } from 'react-native-camera';
import { Button, Text } from 'components';
import { SVG } from './assets';
import { IconButton } from 'components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { ProfilePhoto } from '../../context/model';
import { useProfileForm } from 'containers/OnBoarding/ProfileFormSwiper/context/ProfileFormContext';

export const ProfilePhotoCameraScreen: React.VFC = () => {
  const navigation = useNavigation();
  const form = useProfileForm();

  const onSelectPhoto = (photo: ProfilePhoto) => {
    form.setPhoto(photo);
    navigation.goBack();
  };

  const onClose = () => navigation.goBack();

  return <ProfilePhotoCamera onSelect={onSelectPhoto} onClose={onClose} />;
};

interface ProfilePhotoCameraProps {
  onSelect: (photo: ProfilePhoto) => void;
  onClose: () => void;
}

const cameraProps: RNCameraProps = {
  autoFocus: 'off',
  // faceDetectionMode: 'accurate',
  captureAudio: false,
  type: 'front',
};

export const ProfilePhotoCamera: React.VFC<ProfilePhotoCameraProps> = ({ onSelect, onClose }) => {
  const styles = useProfilePhotoCameraStyles();

  const [photo, setPhoto] = useState<ProfilePhoto>({});
  const cameraRef = createRef<RNCamera>();

  const takePicture = async () => {
    const camera = cameraRef.current;
    if (!camera) {
      return;
    }
    takePictureFromCamera(camera).catch((err) => console.warn('Cannot get picture', err));
  };

  const takePictureFromCamera = async (camera: RNCamera) => {
    setPhoto({ ...photo, loading: true });
    const data = await camera
      .takePictureAsync({ base64: true, fixOrientation: true })
      .then((d) => {
        return d;
      })
      .catch((err) => {
        console.log('Error to take picture...', err);
      });
    if (!data) {
      return;
    }
    const { uri, base64 } = data;
    setPhoto({ source: { uri }, base64 });
  };

  const selectPhoto = () => {
    onSelect(photo);
    setPhoto({});
  };

  const showCamera = !photo.loading && !photo.source;

  if (Platform.OS === 'android' && !photo.source) {
    return <AndroidAdaptedCamera photo={photo} taker={takePictureFromCamera} onClose={onClose} />;
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.backButtonContainer}>
          <IconButton onPress={() => onClose()} style={styles.backButton}>
            <SVG.Close />
          </IconButton>
        </View>
        <View style={styles.cameraContainer}>
          {showCamera && <RNCamera style={styles.camera} {...cameraProps} ref={cameraRef} />}
          {!showCamera && photo.loading && <ActivityIndicator color={'grey'} />}
          {!showCamera && photo.source && <Image style={styles.photoPreview} source={photo.source} />}
        </View>
        <View
          style={[
            styles.captureContainer,
            !!photo.source && styles.captureContainerCaptured,
            photo.loading && styles.captureContainerDisabled,
          ]}>
          {!photo.source && (
            <Button onPress={() => takePicture()}>
              <Text style={styles.captureButtonText}>SAVE</Text>
            </Button>
          )}
          {photo.source && (
            <>
              <Pressable onPress={() => setPhoto({})}>
                <Text>TAKE ANOTHER</Text>
              </Pressable>
              <Button onPress={() => selectPhoto()}>
                <Text style={styles.captureButtonText}>SELECT</Text>
              </Button>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const AndroidAdaptedCamera = (props: {
  taker: (camera: RNCamera) => Promise<void>;
  photo: ProfilePhoto;
  onClose: () => void;
}) => {
  const styles = useProfilePhotoCameraStyles();
  const androidStyles = useProfileAndroidPhotoCameraStyle();

  return (
    <View style={[styles.root]}>
      <SafeAreaView style={[styles.safeArea]}>
        <RNCamera {...cameraProps} style={androidStyles.camera}>
          {(rnCamera) => (
            <>
              <View style={androidStyles.cameraInner}>
                <View style={[styles.cameraContainer, androidStyles.layout]}>
                  <View style={[styles.cameraContainer, androidStyles.layoutBorder]} />
                </View>
                <View style={[styles.backButtonContainer, androidStyles.closeContainer]}>
                  <IconButton onPress={() => props.onClose()} style={styles.backButton}>
                    <SVG.Close />
                  </IconButton>
                </View>

                <View style={androidStyles.bottomButtonContainer}>
                  <Button loading={props.photo.loading} onPress={() => props.taker(rnCamera.camera)}>
                    <Text style={styles.captureButtonText}>SAVE</Text>
                  </Button>
                </View>
              </View>
            </>
          )}
        </RNCamera>
      </SafeAreaView>
    </View>
  );
};
