import { makeStyle } from '@hooks/themed-style.hook';

export const useCardStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.background.alternative,

    paddingHorizontal: 10,
    paddingVertical: 10,

    borderRadius: 3,

    flexDirection: 'column',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
}));
