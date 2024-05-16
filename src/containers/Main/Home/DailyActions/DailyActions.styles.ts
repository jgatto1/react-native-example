import { makeStyle } from '@hooks/themed-style.hook';

export const useDailyActionsStyles = makeStyle(() => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  bannerContainer: {
    flex: 2,
    paddingVertical: 0,
  },
  banner: {
    flex: 1,
    backgroundColor: 'grey',
  },
  image: {
    width: '100%',
    height: 200,
  },
  actionsContainer: {
    marginTop: 24,
    flex: 4,
  },
}));
