import { makeStyle } from '@hooks/themed-style.hook';

export const useImageDetailStyles = makeStyle(() => ({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: 300,
    // transform: [{ rotate: '90deg' }],
  },
}));
