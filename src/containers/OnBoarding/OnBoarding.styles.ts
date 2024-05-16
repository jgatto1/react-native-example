import { makeStyle } from '@hooks/themed-style.hook';

export const useOnBoardingStyles = makeStyle((theme) => ({
  mainContainer: {
    flex: 100,
    alignItems: 'center',
    display: 'flex',
    minWidth: '100%',
    justifyContent: 'center',
  },
  mainCard: {
    width: '80%',
    minWidth: '80%',
    height: '80%',
    backgroundColor: theme.palette.other.onBoarding.card.background,
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 3,
  },
  actionContainer: {
    flex: 25,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  startButton: {
    paddingHorizontal: 60,
  },
  formMiddleBackground: {
    backgroundColor: theme.palette.accent,
  },
}));
