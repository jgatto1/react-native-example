import { makeStyle } from 'providers/hooks/themed-style.hook';

export const useRatingStarsStyles = makeStyle(() => ({
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerStars: {
    justifyContent: 'center',
  },
}));
