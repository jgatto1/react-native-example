import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { Modal } from 'components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useImageDetailStyles } from './ImageDetail.styles';

interface ImageRouteParams {
  imageUrl: ImageSourcePropType;
}

export const ImageDetail: React.VFC = ({}) => {
  const styles = useImageDetailStyles();
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUrl } = route.params as ImageRouteParams;
  return (
    <Modal onClose={() => navigation.goBack()}>
      <View style={styles.modalRoot}>
        <Image style={styles.image} source={imageUrl} />
      </View>
    </Modal>
  );
};
