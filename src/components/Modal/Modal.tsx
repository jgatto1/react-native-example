import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { Card } from 'components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackgroundView, BackgroundViewStyles } from 'components/BackgroundView/BackgroundView';
import CloseSVG from 'containers/Main/Home/DailyActions/Question/modal/assets/close.svg';
import { useModalStyles } from 'components/Modal/Modal.styles';
import { WithOutTabBar } from 'providers/navigation/hide-tab.hook';

interface ModalRouteProp {
  closeRoute?: string;
}

interface ModalProps {
  onClose?: () => void;
  withoutTabBar?: boolean;
  backgroundViewStyles?: BackgroundViewStyles;
  styles?: ModalStyles;
  noAvoidView?: boolean;
}

interface ModalStyles {
  root?: StyleProp<ViewStyle>;
  closeContainer?: StyleProp<ViewStyle>;
  bottomSpace?: StyleProp<ViewStyle>;
  card?: StyleProp<any>;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const baseStyles = useModalStyles();
  const route = useRoute();
  const navigation = useNavigation();
  const params = (route.params || {}) as ModalRouteProp;

  const close = () => {
    if (props.onClose) {
      props.onClose();
      return;
    }
    if (params.closeRoute) {
      navigation.navigate(params.closeRoute);
    } else {
      navigation.goBack();
    }
  };

  const Wrapper = props.withoutTabBar ? WithOutTabBar : WithTabBar;

  const ContentWrapper = props.noAvoidView ? DirectContent : AvoidView;

  return (
    <Wrapper>
      <BackgroundView styles={props.backgroundViewStyles}>
        <SafeAreaView>
          <View style={[baseStyles.root, props.styles?.root]}>
            <ContentWrapper>
              <Card style={props?.styles?.card}>
                <View style={[baseStyles.closeContainer, props.styles?.closeContainer]}>
                  <Pressable onPress={() => close()}>
                    <CloseSVG />
                  </Pressable>
                </View>
                {props.children}
              </Card>
            </ContentWrapper>
          </View>
          <View style={[baseStyles.bottomSpace, props.styles?.bottomSpace]} />
        </SafeAreaView>
      </BackgroundView>
    </Wrapper>
  );
};

const AvoidView: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : -10}>
      {children}
    </KeyboardAvoidingView>
  );
};

const DirectContent: React.FC = ({ children }) => {
  return <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>{children}</View>;
};
const WithTabBar: React.FC = ({ children }) => {
  return <>{children}</>;
};

export const ModalWrapper = Modal;
