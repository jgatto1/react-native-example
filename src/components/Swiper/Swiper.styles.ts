import { makeStyle } from '@hooks/themed-style.hook';

export const useSwiperStyles = makeStyle((theme) => ({
  animatedContainer: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  barContainer: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listContainer: {
    flex: 8,
  },
  paginationContainer: {
    paddingHorizontal: 5,
    width: '100%',
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonLeftContainer: {
    width: 100,
    maxWidth: 100,
    alignItems: 'flex-start',
  },
  buttonLeft: {
    paddingHorizontal: 10,
    backgroundColor: theme.palette.other.onBoarding.button.accent,
  },
  buttonLeftText: {
    color: theme.palette.other.onBoarding.text.accent,
  },
  buttonRightContainer: {
    alignItems: 'flex-end',
    width: 100,
    maxWidth: 100,
  },
  dotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainerGrow: {
    flexGrow: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: theme.palette.other.onBoarding.button.accent,
  },
  dotCurrent: {
    backgroundColor: theme.palette.primary,
  },
}));
