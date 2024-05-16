import { Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, View } from 'react-native';
import React from 'react';
import { ModalStyleProps, useModalStyles } from './Modal.styles';
import CloseSVG from 'containers/Main/Home/DailyActions/Question/modal/assets/close.svg';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'components';

interface ModalProps {
  onClose?: () => void;
  withoutTabBar?: boolean;
  styles?: ModalStyleProps;
  noAvoidView?: boolean;
}

export const ModalWrapper: React.FC<ModalProps> = (props) => {
  const styles = useModalStyles(props.styles);
  const navigation = useNavigation();

  const close = () => {
    if (props.onClose) {
      props.onClose();
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View style={styles.background}>
        <View style={styles.bgTop} />
        <View style={styles.bgMiddle} />
        <View style={styles.bgBottom} />
      </View>
      <SafeAreaView style={styles.contentSafeView}>
        <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.closeContainer}>
              <Pressable
                onPress={() => {
                  console.log('AAAAA');
                  close();
                }}>
                <CloseSVG />
              </Pressable>
            </View>
            <KeyboardAvoidingView behavior='position' style={styles.contentWrapper}>
              <Card style={[styles.cardBase, props.styles?.card]}>{props.children}</Card>
            </KeyboardAvoidingView>
          </View>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};
