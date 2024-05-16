import { ActivityIndicator, Image, Pressable, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useSafetyPictureStyles } from './SafetyPicture.styles';
import { Button, Card, Text } from 'components';
import { Space } from 'components/Space/Space';
import { TextLink } from 'components/Text/TextLink';
import { useNavigation } from '@react-navigation/native';
import { SafetyPictureRoutes } from 'containers/Main/Safety/Picture/SafetyPicture.routes';
import { SVG } from './assets';
import { useSafetyPictureContext } from 'containers/Main/Safety/Picture/SafetyPicture.context';
import { BackendUpload, Base64UploadFile } from 'service/backend-client.upload.service';
import { Fields, UploadFileItem } from 'react-native-fs';
import { Res, validateResponse } from 'model/backend';
import { SafeUnsafe } from 'model/backend/safe-unsafe';
import { BackendClient } from 'service/backend-client.service';
import { showAlertIfNetworkError } from 'providers/error.alert';

const POST_URL = '/msp_post/create';

export const SafetyPicture: React.VFC = () => {
  const styles = useSafetyPictureStyles();
  const navigation = useNavigation();

  const { loading, safe, unsafe } = useSafetyPictureContext();

  const [posting, setPosting] = useState<'PRIVATE' | 'PUBLIC'>();

  const buildPostFields = (data: SafeUnsafe, isPublic: boolean, origin: string) => {
    return {
      origin: origin || 'Safe / Unsafe Picture',
      resource_data: data.description,
      is_public: isPublic ? 'true' : 'false',
    };
  };

  const requestMedia = async (data: SafeUnsafe, isPublic: boolean, origin: string) => {
    const base64 = await BackendUpload.fetchBase64(data.picture_url_512);
    if (!base64 || !(base64.base64 || base64.path)) {
      throw new Error('No base64 file');
    }
    console.log('before', origin);
    const fields: Fields = buildPostFields(data, isPublic, origin);

    if (base64.path) {
      const files: UploadFileItem[] = [
        { filename: base64.name, filepath: base64.path, filetype: base64.type, name: base64.name },
      ];
      return BackendUpload.postFiles<Res>(POST_URL, files, fields);
    }
    const file: Base64UploadFile = {
      filename: base64.name,
      base64: base64.base64,
      type: base64.type,
    };
    return BackendUpload.post<Res>(POST_URL, file, fields);
  };

  const jsonRequest = (data: SafeUnsafe, isPublic: boolean, origin: string) => {
    return BackendClient.post<Res>(POST_URL, buildPostFields(data, isPublic, origin));
  };

  const doPost = ({ isPublic, data, origin }: { isPublic: boolean; data?: SafeUnsafe; origin: string }) => {
    if (!data) {
      return;
    }
    setPosting(isPublic ? 'PUBLIC' : 'PRIVATE');
    const postRes = data.picture_url_512 ? requestMedia(data, isPublic, origin) : jsonRequest(data, isPublic, origin);
    postRes
      .then(validateResponse)
      .then(() => {
        console.log('Post safe picture');
        navigation.goBack();
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.error('Cannot do post', err);
      })
      .finally(() => setPosting(undefined));
  };

  return (
    <ScrollView style={styles.root}>
      <Card>
        <Text bold center>
          Introduction to Safe versus Unsafe Picture
        </Text>
        <Space />
        <Text center>
          Choose pictures to remind you of what it's like to be safe vs unsafe (or just do one of these if that's better
          for you).
        </Text>
        <Space />
        <Text center>
          Use your imagination to choose pictures that are personally meaningful. They don't have to be photos of you.
        </Text>
      </Card>
      <Space margin={5} />

      {[safe, unsafe].map((p, index) => (
        <View key={index}>
          <Space margin={10} />
          <Card>
            <View style={styles.pictureContainer}>
              <Text bold center>
                {index === 0 ? 'Safe' : 'Unsafe'} Picture
              </Text>
              <View style={styles.pictureEditContainer}>
                <TextLink
                  onPress={() => {
                    navigation.navigate(index === 0 ? SafetyPictureRoutes.LOAD_SAFE : SafetyPictureRoutes.LOAD_UNSAFE);
                  }}>
                  Edit
                </TextLink>
              </View>
              <Space margin={10} />
              <View style={styles.imageContainer}>
                {loading && <ActivityIndicator color='grey' />}
                {!loading && p?.picture_url_512 && (
                  <>
                    <Image style={styles.image} source={{ uri: p.picture_url_512 }} />
                    {!!p.description && (
                      <>
                        <Space />
                        <Text>{p.description}</Text>
                      </>
                    )}
                  </>
                )}
                {!loading && !p?.picture_url_512 && (
                  <Pressable
                    style={styles.noPictureContainer}
                    onPress={() =>
                      navigation.navigate(index === 0 ? SafetyPictureRoutes.LOAD_SAFE : SafetyPictureRoutes.LOAD_UNSAFE)
                    }>
                    {index === 0 ? (
                      <SVG.CheckGreen width={100} height={100} />
                    ) : (
                      <SVG.CrossRed width={100} height={100} />
                    )}
                    <Space margin={10} />
                    <Text center>Tap Edit to add an {index === 0 ? 'SAFE' : 'UNSAFE'} Picture picture and text</Text>
                  </Pressable>
                )}
              </View>
            </View>
            <Space margin={10} />
            <View style={styles.socialButtonsContainer}>
              <Button
                disabled={!p?.id || posting === 'PUBLIC'}
                loading={posting === 'PRIVATE'}
                onPress={() =>
                  doPost({ isPublic: false, data: p, origin: `${index === 0 ? 'Safe' : 'Unsafe'} Picture` })
                }>
                FOR YOU
              </Button>
              <Space horizontal margin={5} />
              <Button
                disabled={!p?.id || posting === 'PRIVATE'}
                loading={posting === 'PUBLIC'}
                onPress={() =>
                  doPost({ isPublic: true, data: p, origin: `${index === 0 ? 'Safe' : 'Unsafe'} Picture` })
                }>
                SHARE
              </Button>
            </View>
          </Card>
        </View>
      ))}
      <Space margin={40} />
    </ScrollView>
  );
};
