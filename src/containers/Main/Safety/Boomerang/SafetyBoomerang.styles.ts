import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyBoomerangStyles = makeStyle(() => ({
  root: {
    paddingHorizontal: 15,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  boomerangContainer: {
    marginHorizontal: 30,
  },
}));
