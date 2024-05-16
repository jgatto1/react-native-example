import { makeStyle } from '@hooks/themed-style.hook';

export const useProfilePhotoStyles = makeStyle(() => ({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 2,
  },
  pickerContainer: {
    flex: 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  previewBox: {
    width: 120,
    height: 120,
    backgroundColor: '#d4e2d7',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    maxWidth: 120,
    maxHeight: 120,
    width: 120,
    height: 120,
    zIndex: 12,
  },
  buttonsContainer: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMiddle: {
    marginVertical: 20,
  },
}));
