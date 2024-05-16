import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const usePickerStyles = makeStyle((theme) => ({
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    width: '100%',
    overflow: 'visible',
    height: Dimensions.get('window').height,
  },
  androidBase: {
    height: 100,
  },
  pickerDone: {
    position: 'absolute',
    right: 0,
    zIndex: 3,
    alignItems: 'flex-end',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  noOverlay: {
    opacity: 0,
  },

  picker: {
    backgroundColor: theme.palette.background.principal,
    borderTopWidth: 0.5,
    borderTopColor: alphaRGB(theme.palette.primary, 0.3),

    paddingTop: 15,
    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
}));
