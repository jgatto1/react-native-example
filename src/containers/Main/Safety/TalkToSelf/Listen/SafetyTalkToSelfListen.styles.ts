import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyTalkToSelfListenStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 15,
    flex: 1,
  },
  playerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary,
    borderRadius: 1000,
  },
  trackerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    position: 'relative',
  },
  sliderContainer: {
    width: '90%',
  },
  timerContainer: {
    position: 'absolute',
    bottom: -8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  trackerLine: {
    width: '98%',
    position: 'relative',
    borderWidth: 2,
    borderRadius: 5,
  },
  trackerDot: {
    position: 'absolute',
    borderRadius: 1000,
    width: 12,
    height: 12,
    top: -6,
    backgroundColor: theme.palette.primary,
  },
}));
