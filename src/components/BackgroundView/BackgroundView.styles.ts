import { makeStyle } from '@hooks/themed-style.hook';

export const useBackgroundViewStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  backgroundTop: {
    flex: 60,
    backgroundColor: theme.palette.other.onBoarding.background.top,
  },
  backgroundMiddle: {
    flex: 15,
    backgroundColor: theme.palette.other.onBoarding.background.middle,
  },
  backgroundBottom: {
    flex: 25,
    backgroundColor: theme.palette.other.onBoarding.background.bottom,
  },
  content: {
    flex: 1,
  },
}));
