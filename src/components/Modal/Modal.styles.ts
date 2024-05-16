import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useModalStyles = makeStyle(() => ({
  root: {
    paddingTop: 120,
    width: Dimensions.get('window').width,
    flex: 4,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  closeContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  bottomSpace: {
    flex: 2,
  },
}));
