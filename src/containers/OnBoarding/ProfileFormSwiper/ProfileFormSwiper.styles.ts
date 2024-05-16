import { makeStyle } from '@hooks/themed-style.hook';

export const useProfileFormSwiper = makeStyle((theme) => ({
  cardContainer: {
    minWidth: '95%',
    maxWidth: '95%',
    height: '95%',
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

    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  cardMain: {
    flex: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '15%',
  },
  titleContainer: {
    flex: 1,
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  childrenContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}));
