import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetySurpriseViewStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 15,
  },
  title: {
    color: theme.palette.text.title,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    minWidth: '40%',
    height: 250,
    resizeMode: 'contain',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerStars: {
    justifyContent: 'center',
  },
}));
