import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyStyles = makeStyle(() => ({
  root: {
    paddingHorizontal: 15,
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
}));
