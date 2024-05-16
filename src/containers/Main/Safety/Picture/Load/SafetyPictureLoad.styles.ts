import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPictureLoadStyles = makeStyle((theme) => ({
  root: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    borderRadius: 1000,
    backgroundColor: theme.palette.primary,
  },
  removeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  describeInput: {
    height: 100,
  },
  saveContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  image: {
    maxWidth: '100%',
    minWidth: '40%',
    height: 250,
    resizeMode: 'contain',
  },
}));
