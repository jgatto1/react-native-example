import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafetyPictureLoadStyles } from './SafetyPictureLoad.styles';
import { Button, Card, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import * as ImagePicker from 'react-native-image-picker';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { SVG } from './assets';
import { useSafetyPictureContext } from 'containers/Main/Safety/Picture/SafetyPicture.context';
import { SafetyPictureRoutes } from 'containers/Main/Safety/Picture/SafetyPicture.routes';
import { useNavigation } from '@react-navigation/native';

interface SafetyPictureLoadProps {
  isSafe: boolean;
}

function launchLibrary(): Promise<ImagePickerResponse> {
  const cameraOpts: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    includeBase64: true,
  };
  return new Promise((resolve) => ImagePicker.launchImageLibrary(cameraOpts, (res) => resolve(res)));
}

interface Photo {
  loading?: boolean;
  base64?: string;
}

const SafetyPictureLoad: React.VFC<SafetyPictureLoadProps> = ({ isSafe }) => {
  const styles = useSafetyPictureLoadStyles();
  const navigation = useNavigation();
  const { loading, safe, unsafe, deleteSafe, deleteUnsafe, setSafe, setUnsafe, updateDescription } =
    useSafetyPictureContext();

  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<Photo>({});

  const data = isSafe ? safe : unsafe;
  const deleter = isSafe ? deleteSafe : deleteUnsafe;
  const setter = isSafe ? setSafe : setUnsafe;

  useEffect(() => {
    if (data?.description) {
      setDescription(data?.description);
    }
  }, [data?.description]);

  const openLibrary = async () => {
    setPhoto({ ...photo, loading: true });
    const res = await launchLibrary().catch((err) => console.error(err));
    if (!res || res.didCancel || res.errorCode || !res.assets) {
      if (photo.base64) {
        setPhoto({ ...photo });
      }
      return;
    }
    const { base64 } = res.assets[0];
    if (!base64) {
      return;
    }
    setPhoto({ base64 });
  };

  const source = data?.picture_url_512
    ? { uri: data.picture_url_512 }
    : photo?.base64
    ? { uri: `data:image/jpg;base64,${photo.base64}` }
    : null;

  const removeImage = () => {
    if (photo && photo.base64) {
      setPhoto({});
    }
    if (data?.picture_url_512) {
      deleter();
      setDescription('');
    }
  };

  const save = () => {
    if (!photo.base64) {
      updateDescription(description, isSafe)
        .then(() => navigation.navigate(SafetyPictureRoutes.MENU))
        .catch((err) => console.warn('Cannot update description', err));
      return;
    }
    setter(photo.base64, description).then(() => navigation.navigate(SafetyPictureRoutes.MENU));
  };

  const canSave = !!photo.base64 || !!data?.picture_url_512;

  return (
    <ScrollView style={styles.root}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={150}>
        <Text center bold>
          Add a picture that represents your {isSafe ? 'SAFE' : 'UNSAFE'} self
        </Text>
        <Space />
        <Card>
          {!source && !photo.loading && (
            <View style={styles.addButtonContainer}>
              <Pressable style={styles.addButton} onPress={() => openLibrary()}>
                <SVG.Add fill='white' width={50} height={50} />
              </Pressable>
            </View>
          )}
          {!source && photo.loading && <ActivityIndicator color='grey' />}
          {source && (
            <>
              <Image style={styles.image} source={source} />
              <Space />
              <View style={styles.removeContainer}>
                <Button onPress={() => removeImage()}>REMOVE</Button>
              </View>
            </>
          )}
        </Card>
        <Space margin={15} />
        <Text center bold>
          Describe your {isSafe ? 'SAFE' : 'UNSAFE'} self
        </Text>
        <TextInput
          onChangeText={(text) => canSave && setDescription(text)}
          style={styles.describeInput}
          multiline
          editable={canSave}
          value={description}
          placeholder='Write something...'
        />
        <Space margin={15} />
        <View style={styles.saveContainer}>
          <Button disabled={!canSave} loading={loading} onPress={() => save()}>
            SAVE
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export const SafetyPictureLoadSafe = () => <SafetyPictureLoad isSafe={true} />;

export const SafetyPictureLoadUnsafe = () => <SafetyPictureLoad isSafe={false} />;
