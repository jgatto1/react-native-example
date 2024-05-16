import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPictureStyles = makeStyle(() => ({
  root: {
    paddingTop: 15,
    paddingHorizontal: 15,
    flex: 1,
  },
  pictureContainer: {
    position: 'relative',
    width: '100%',
  },
  pictureEditContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  image: {
    maxWidth: '100%',
    minWidth: '80%',
    height: 200,
    resizeMode: 'contain',
  },
  noPictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));
