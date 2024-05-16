import { makeStyle } from '@hooks/themed-style.hook';

export const useReachOutCopingCoachStyles = makeStyle((theme) => ({
  container: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    // position: 'relative',
    paddingVertical: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardContent: {
    alignSelf: 'center',
  },
  moreInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  arrow: {
    color: theme.palette.primary,
  },
}));
