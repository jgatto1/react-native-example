import { makeStyle } from '@hooks/themed-style.hook';

export const useWelcomeSwiperStyles = makeStyle((theme) => ({
  mainCard: {
    width: '80%',
    minWidth: '80%',
    height: '80%',
    backgroundColor: theme.palette.other.onBoarding.card.background,
    shadowColor: 'rgb(0,0,0)',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 2,
  },
  startButton: {
    paddingHorizontal: 60,
  },
  cardTitleContainer: {
    flex: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    textAlign: 'center',
    paddingHorizontal: 50,
    color: theme.palette.other.onBoarding.title.color,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  cardAnimationContainer: {
    flex: 45,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  cardAnimation: {
    width: '80%',
    height: '80%',
    overflow: 'visible',
  },
  cardDescriptionContainer: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescription: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
}));
