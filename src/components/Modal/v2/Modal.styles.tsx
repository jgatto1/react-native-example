import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';

export interface ModalStyleProps {
  bgPosition?: number;
  bgHeight?: number;
  bgColor?: string;
  card?: StyleProp<ViewStyle>;
}

const modalStyles = (props: ModalStyleProps) =>
  makeStyle((theme) => ({
    root: {
      position: 'relative',
      height: '100%',
    },
    background: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    bgTop: {
      backgroundColor: theme.palette.background.principal,
      height: `${props.bgPosition || 55}%`,
    },
    bgMiddle: {
      backgroundColor: props.bgColor || theme.palette.selected.primary,
      height: props.bgHeight || 100,
    },
    bgBottom: {
      backgroundColor: theme.palette.background.principal,
      flexGrow: 1,
    },
    contentSafeView: {
      position: 'relative',
      borderWidth: 0,
      height: '100%',
    },
    contentContainer: {
      borderWidth: 0,
      height: '100%',
      width: '100%',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeContainer: {
      position: 'absolute',
      top: 10,
      left: 15,
    },
    contentWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: '85%',
      borderWidth: 0,
    },
    cardBase: {
      width: Dimensions.get('window').width * 0.85,
      maxWidth: 450,
    },
  }));

export const useModalStyles = (props?: ModalStyleProps) => {
  const hookFactory = modalStyles(props || {});
  return hookFactory();
};
