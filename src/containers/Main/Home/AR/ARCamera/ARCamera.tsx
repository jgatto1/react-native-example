import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import React, { createRef, useEffect, useState } from 'react';
import { useARCameraStyles } from './ARCamera.styles';
import { useNavigationHideTab } from 'providers/navigation/hide-tab.hook';
import { Button, Space, Text, TextInput } from 'components';
import { useNavigation } from '@react-navigation/native';
import { SVG } from './assets';
import { ARTreeViroMain, IARTreeSceneRef } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/ARTreeViro';
import { ModalWrapper } from 'components/Modal/Modal';
import { Res, validateResponse } from 'model/backend';
import { BackendUpload } from 'service/backend-client.upload.service';
import { Fields } from 'react-native-fs';
import FastImage from 'react-native-fast-image';
import { resize, retry } from 'containers/Main/Home/AR/ARCamera/ARCamera.screenshot.helper';

export const ARCamera: React.VFC = () => {
  useNavigationHideTab();
  const styles = useARCameraStyles();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(true);
  const arRef = createRef<IARTreeSceneRef>();

  const [showViro, setShowViro] = useState(Platform.OS === 'ios');
  const [androidExiting, setAndroidExiting] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      return;
    }
    let timer = setTimeout(() => setShowViro(true), 3000);
    return () => {
      clearTimeout(timer);
    };
  });

  const [rotate, setRotate] = useState<'LEFT' | 'RIGHT'>();

  const rotateLeft = !showModal && (() => setRotate('LEFT'));

  const rotateRight = !showModal && (() => setRotate('RIGHT'));

  const stopRotation = () => setRotate(undefined);

  useEffect(() => {
    if (!rotate) {
      return;
    }
    arRef.current?.rotate(rotate);
    const interval = setInterval(() => {
      arRef.current?.rotate(rotate);
    }, 200);
    return () => clearInterval(interval);
  }, [arRef, rotate]);

  const photo =
    !showModal &&
    (() => {
      if (!arRef.current?.showingTree()) {
        return;
      }
      setScreenshotLoading(true);
      setScreenshotError(undefined);
      setScreenshotLoadingInfo(undefined);
      retry(
        async (info) => {
          setScreenshotLoadingInfo(info);
          return await arRef.current!.screenshot();
        },
        (res) => !!res && (res.success || !!res.url),
        3
      )
        .then((result) => {
          setScreenshotLoadingInfo('Resizing photo...');
          const resultUrl = Platform.OS === 'android' ? `file://${result.url}` : result.url;
          return resize(resultUrl).catch((err) => {
            console.warn(`Cannot resize ${result.url} [${result.success}]. ${err.message}`, err);
            return { uri: resultUrl };
            // throw Error(`Cannot resize ${result.url} [${result.success}]. ${err.message}`);
          });
        })
        .then((res) => {
          setScreenshotLoading(false);
          setScreenshotUrl(res.uri);
          setShowPostModal(true);
          setScreenshotLoadingInfo(undefined);
        })
        .catch((err) => {
          console.warn('Cannot process AR screenshot', err);
          setScreenshotLoading(false);
          setScreenshotLoadingInfo(undefined);
          setShowPostModal(true);
          setScreenshotError('Cannot take photo. Try again.');
        });
    });

  const [screenshotUrl, setScreenshotUrl] = useState<string>();
  const [smallerScreenshotUrl, setSmallerScreenshotUrl] = useState<string>();
  const [postText, setPostText] = useState('');
  const [posting, setPosting] = useState<'PRIVATE' | 'PUBLIC'>();
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [screenshotLoadingInfo, setScreenshotLoadingInfo] = useState<string>();
  const [showPostModal, setShowPostModal] = useState(false);
  const [screenshotError, setScreenshotError] = useState<string>();

  React.useEffect(() => {
    if (!screenshotUrl) {
      return;
    }
    const resizeScreenshot = async () => {
      await resize('file://' + screenshotUrl).then((response) => {
        setSmallerScreenshotUrl(response.uri);
      });
    };
    resizeScreenshot();
  }, [screenshotUrl]);

  const closeModal = () => {
    setShowPostModal(false);
    setScreenshotUrl(undefined);
  };

  const doPost = async ({ isPublic }: { isPublic: boolean }) => {
    console.log({ smallerScreenshotUrl });
    console.log({ screenshotUrl });
    console.log('---');

    if (!smallerScreenshotUrl) {
      return;
    }
    const postData: Fields = {
      resource_data: postText,
      is_public: `${isPublic}`,
      origin: 'AR Scene',
    };
    setPosting(isPublic ? 'PUBLIC' : 'PRIVATE');
    BackendUpload.postFiles<Res>(
      '/msp_post/create',
      [
        {
          name: 'ss-ar',
          filetype: 'image/png',
          filename: 'ss-ar.jpg',
          filepath: screenshotUrl!!.replace('file://', ''),
        },
      ],
      postData
    )
      .then(validateResponse)
      .catch((err) => {
        console.warn('Cannot create post from AR Tree', err);
      })
      .then(() => {
        closeModal();
      })
      .finally(() => setPosting(undefined));
  };

  const postForYou = () => {
    doPost({ isPublic: false });
  };

  const postShare = () => {
    doPost({ isPublic: true });
  };

  return (
    <View style={styles.root}>
      <Modal visible={showPostModal} animationType='slide' transparent={false}>
        <ModalWrapper
          styles={{ root: styles.modalRoot, bottomSpace: styles.modalBottomSpace }}
          backgroundViewStyles={{ top: styles.modalTop, middle: styles.modalMiddle }}
          onClose={() => closeModal()}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.postContainer}>
              <Space />
              {(screenshotLoading || !screenshotUrl || screenshotError) && (
                <View style={styles.modalImageUrl}>
                  {screenshotLoading && (
                    <>
                      <ActivityIndicator color='grey' />
                      <Text>{screenshotLoadingInfo}</Text>
                    </>
                  )}
                  {screenshotError && <Text>{screenshotError}</Text>}
                </View>
              )}
              {!screenshotLoading && !screenshotError && !!screenshotUrl && (
                <Image style={styles.modalImage} source={{ uri: screenshotUrl, width: 140 }} />
              )}
              <Space />

              <TextInput
                value={postText}
                onChangeText={(t) => setPostText(t)}
                multiline={true}
                placeholder='Write something...'
                style={styles.postInput}
              />
              <Space />
              <View style={styles.postButtons}>
                <Button
                  disabled={!screenshotUrl || !!posting}
                  noShadow
                  horizontalButtonPadding={20}
                  onPress={() => {
                    setScreenshotLoading(true);
                    CameraRoll.save(screenshotUrl!, { type: 'photo' })
                      .then(() => {
                        setScreenshotLoading(false);
                        closeModal();
                      })
                      .catch((err) => {
                        setScreenshotLoading(false);
                        setScreenshotError(`Cannot save on photos ${err.message}`);
                        console.warn(`Cannot save on photos ${err.message}`);
                      });
                  }}>
                  SAVE
                </Button>
                <Button
                  loading={posting === 'PRIVATE'}
                  disabled={!screenshotUrl || !!posting}
                  // padding={15}
                  horizontalButtonPadding={20}
                  // style={{marginHorizontal: 10}}
                  onPress={() => postForYou()}>
                  FOR YOU
                </Button>
                <Button
                  loading={posting === 'PUBLIC'}
                  disabled={!screenshotUrl || !!posting}
                  // padding={15}
                  horizontalButtonPadding={20}
                  onPress={() => postShare()}>
                  SHARE
                </Button>
              </View>
              <Space />
            </View>
          </TouchableWithoutFeedback>
        </ModalWrapper>
      </Modal>
      {showViro && <ARTreeViroMain ref={arRef} />}
      {Platform.OS === 'android' && !showViro && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color={styles.topButton.backgroundColor} />
          <Space />
          <Text center>Loading...</Text>
        </View>
      )}
      <Pressable
        style={[styles.topButton, styles.exitButton]}
        onPress={() => {
          if (Platform.OS === 'android') {
            if (androidExiting) {
              return;
            }
            setShowViro(false);
            setAndroidExiting(true);
            setTimeout(() => {
              setAndroidExiting(false);
              navigation.goBack();
            }, 1000);
          } else {
            navigation.goBack();
          }
        }}>
        <SVG.Close width={16} height={16} />
        <Space horizontal margin={3} />
        <Text bold style={styles.topButtonText}>
          EXIT {androidExiting && <ActivityIndicator size='small' color='white' />}
        </Text>
      </Pressable>
      {showModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text center bold size={25}>
              HOW IT WORKS
            </Text>
            <Space />
            <View style={styles.modalContent}>
              <View style={styles.modalGifContainer}>
                {Platform.OS === 'ios' ? (
                  <Image source={require('./assets/tutorial.gif')} />
                ) : (
                  <FastImage
                    resizeMode={'contain'}
                    style={{ height: 300, width: 140 }}
                    source={require('./assets/tutorial.gif')}
                  />
                )}
              </View>
              <View style={styles.modalText}>
                <Text bold size={16}>
                  1. PLACE
                </Text>
                <Space margin={2} />
                <Text size={12}>
                  <Text bold>Point your device at a flat surface</Text> like the floor or a tabletop in a well lit area.
                </Text>

                <Space />
                <Text bold size={16}>
                  2. TAP
                </Text>
                <Space margin={2} />
                <Text size={12}>
                  When you see the{' '}
                  <Text bold>
                    <Text italic>Seeking Safety</Text> logo
                  </Text>{' '}
                  through your camera view, <Text bold>tap on the screen to place</Text> the virtual tree there.
                </Text>

                <Space />
                <Text bold size={16}>
                  3. VIEW
                </Text>
                <Space margin={2} />
                <Text size={12}>
                  Take a closer look at the ree by moving your device around. The tree will remain where you planted it
                  as you walk around it.
                </Text>
              </View>
            </View>
            <Space margin={10} />
            <View style={styles.modalButtonContainer}>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}>
                TRY NOW
              </Button>
            </View>
          </View>
        </View>
      )}
      <View style={styles.bottomBar}>
        <Pressable onPressIn={() => rotateLeft && rotateLeft()} onPressOut={() => stopRotation()}>
          <SVG.Rotate fill={styles.rotateSVG.color} />
        </Pressable>
        <Pressable style={[styles.photoButton]} onPress={() => photo && photo()}>
          <SVG.Camera />
          <Space horizontal />
          {screenshotLoading ? (
            <ActivityIndicator size='small' color='white' />
          ) : (
            <Text bold style={styles.photoButtonText}>
              PHOTO
            </Text>
          )}
        </Pressable>
        <Pressable
          style={styles.flipRotate}
          onPressIn={() => rotateRight && rotateRight()}
          onPressOut={() => stopRotation()}>
          <SVG.Rotate fill={styles.rotateSVG.color} />
        </Pressable>
      </View>
    </View>
  );
};
