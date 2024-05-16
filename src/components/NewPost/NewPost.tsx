import React, { ReactNode, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CameraSVG from './assets/camera.svg';
import * as ImagePicker from 'react-native-image-picker';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { Fields } from 'react-native-fs';

import { BackendUpload, Base64UploadFile } from 'service/backend-client.upload.service';
import { BackendClient } from 'service/backend-client.service';
import { Button, Divider, Space, Text, TextInput } from 'components';
import { Res, validateResponse } from 'model/backend';
import { useNewPostStyles } from './NewPost.styles';
import { useTheme } from 'providers/theme/ThemeProvider';
import { showAlertIfNetworkError } from 'providers/error.alert';

function openLibrary(): Promise<ImagePickerResponse> {
  const cameraOpts: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    includeBase64: true,
  };
  return new Promise((resolve) => ImagePicker.launchImageLibrary(cameraOpts, (res) => resolve(res)));
}

const POST_URL = '/msp_post/create';

interface NewPostProps {
  title?: string;
  subtitle?: string | ReactNode;
  subtitleDivider?: boolean;
  onSubmitNavigateRoute?: string;
  onSubmitNavigateStack?: string;
  styleContainer?: StyleProp<ViewStyle>;
  minimized?: boolean;
  placeholder?: string;
  titleCenter?: boolean;
  origin?: string;
  backButton?: boolean;
  attachB64?: string; // Only an base64 to attach file
  onPostCreated?: (data: { resource_data: string } & { [key: string]: any }) => void;
}

export const NewPost: React.VFC<NewPostProps> = ({
  title,
  subtitle,
  subtitleDivider = true,
  onSubmitNavigateRoute,
  onSubmitNavigateStack,
  styleContainer,
  minimized,
  placeholder,
  titleCenter,
  origin,
  attachB64,
  backButton,
  onPostCreated,
}: NewPostProps) => {
  const styles = useNewPostStyles();
  const navigation = useNavigation();
  const theme = useTheme();
  const [photo, setPhoto] = useState<ImagePicker.Asset | null>(null);
  const [message, setMessage] = useState<string>();
  const [link, setLink] = useState<string>();

  const [posting, setPosting] = useState<'PUBLIC' | 'PRIVATE'>();

  const pickFromLibrary = async () => {
    const res = await openLibrary().catch((err) => console.error(err));
    if (!res || res.didCancel || res.errorCode || !res.assets) {
      return;
    }
    setPhoto(res.assets[0]);
  };

  const canPost = (!!message && message.length >= 1) || !!photo;

  const buildPostFields = (isPublic?: boolean) => {
    if (!message && !photo) {
      throw new Error('No message to do the post');
    }
    return {
      resource_data: message || '',
      is_public: `${!!isPublic}`,
      origin: origin || 'Social Feed',
      ...(link ? { link } : {}),
    };
  };

  const resolveAttach: () => Base64UploadFile = () => {
    const base = { filename: 'photo.png' };
    if (photo && !!photo.base64 && !!photo.type) {
      return { ...base, base64: photo.base64, type: photo.type };
    }
    if (attachB64) {
      return { ...base, base64: attachB64, type: 'image/png' };
    }
    throw new Error('Invalid media selected');
  };

  const requestMedia = async (isPublic?: boolean) => {
    const fields: Fields = buildPostFields(isPublic);
    const file: Base64UploadFile = resolveAttach();
    return BackendUpload.post<Res>(POST_URL, file, fields);
  };

  const jsonRequest = (isPublic?: boolean) => {
    return BackendClient.post<Res>(POST_URL, buildPostFields(isPublic));
  };

  const doPost = async ({ isPublic }: { isPublic: boolean }) => {
    setPosting(isPublic ? 'PUBLIC' : 'PRIVATE');
    const doPostPromiseMethod = photo || attachB64 ? requestMedia : jsonRequest;
    doPostPromiseMethod(isPublic)
      .then(validateResponse)
      .then(() => {
        console.log('hi');
        if (onPostCreated) {
          onPostCreated(buildPostFields(isPublic));
        }
        setPosting(undefined);
        if (onSubmitNavigateStack) {
          navigation.navigate(onSubmitNavigateStack, { screen: onSubmitNavigateRoute });
        } else if (onSubmitNavigateRoute) {
          navigation.navigate(onSubmitNavigateRoute);
        }
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.error('Cannot do post', err);
      })
      .finally(() => setPosting(undefined));
  };

  const postPrivate = () => doPost({ isPublic: false });
  const postPublic = () => doPost({ isPublic: true });

  return (
    <View style={[styles.root, styleContainer]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView>
          <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={0}>
            <ScrollView style={{ overflow: 'visible' }}>
              <Text weight='bold' center={!!titleCenter}>
                {title}
              </Text>
              {!subtitle && <Space margin={6} />}
              {subtitle && subtitleDivider && <Divider width={0.6} style={styles.divider} />}
              <Space margin={4} />
              {subtitle && typeof subtitle === 'string' ? <Text>{subtitle}</Text> : subtitle}
              <TextInput
                placeholderTextColor={theme.main.palette.other.login.placeholder}
                placeholder={placeholder}
                onChangeText={(text) => setMessage(text)}
                style={styles.textInput}
                multiline
              />

              {!minimized && (
                <>
                  <Divider width={0.6} style={styles.divider} />
                  <View style={styles.container}>
                    <Text>Add photo:</Text>
                    <Button
                      style={styles.photoIconButton}
                      textStyle={styles.photoButtonText}
                      onPress={() => pickFromLibrary()}
                      icon={<CameraSVG width={15} height={15} style={styles.photoButtonIcon} />}
                    />
                    <Button
                      style={styles.photoButton}
                      textStyle={styles.photoButtonText}
                      onPress={() => setPhoto(null)}>
                      REMOVE
                    </Button>
                  </View>
                  {photo && (
                    <View style={styles.photoViewContainer}>
                      <Image style={styles.photoView} source={photo} />
                    </View>
                  )}

                  <Divider width={0.6} style={styles.divider} />

                  <View style={styles.container}>
                    <Text>Add a link:</Text>
                    <View style={styles.linkInputContainer}>
                      <TextInput onChangeText={(textLink) => setLink(textLink.toLowerCase())} value={link} />
                    </View>
                  </View>

                  <Divider width={0.6} style={styles.divider} />
                </>
              )}
              <Space />
              <View style={styles.buttons}>
                {backButton && (
                  <View style={styles.buttonBackContainer}>
                    <Button
                      horizontalButtonPadding={10}
                      style={styles.buttonBack}
                      textStyle={styles.buttonBackText}
                      onPress={() => navigation.goBack()}>
                      BACK
                    </Button>
                  </View>
                )}
                <View style={styles.postButtonsContainer}>
                  <Button
                    disabled={!canPost || posting === 'PRIVATE'}
                    loading={posting === 'PRIVATE'}
                    horizontalButtonPadding={5}
                    onPress={postPrivate}>
                    FOR YOU
                  </Button>
                  <Space horizontal margin={10} />
                  <Button
                    disabled={!canPost || posting === 'PUBLIC'}
                    loading={posting === 'PUBLIC'}
                    horizontalButtonPadding={5}
                    onPress={postPublic}>
                    SHARE
                  </Button>
                </View>
              </View>
              <Space />
              {!minimized && (
                <View style={styles.buttonsInfo}>
                  <View style={styles.buttonsInfoContainer}>
                    <Text style={styles.buttonsInfoText}>
                      Save for you in My Safe Place{'\n'}or share in the Social Feed
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};
