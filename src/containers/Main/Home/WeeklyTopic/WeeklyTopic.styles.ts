import { makeStyle } from '@hooks/themed-style.hook';

export const useWeeklyTopicStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingIndicator: {
    flex: 1,
  },
  videoPlayerContainer: {
    flex: 4,
    paddingVertical: 20,
    minHeight: 250,
  },
  noAnimation: {
    backgroundColor: theme.palette.other.onBoarding.button.accent,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  noVideo: {
    height: 210,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.other.onBoarding.button.accent,
  },
  actionsContainer: {
    flex: 9,
  },
}));
