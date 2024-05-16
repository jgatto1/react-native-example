import { makeStyle } from '@hooks/themed-style.hook';

export const useCountCardStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 25,
  },
  counts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  count: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 10000,
    // paddingHorizontal: 25,
    // paddingVertical: 20,
    // minWidth: 55,
    // minHeight: 55,
    marginBottom: 5,
  },
  countBig: {
    // paddingHorizontal: 35,
    // paddingVertical: 30,
    // minWidth: 75,
    // minHeight: 75,
    // borderWidth: 7,
  },
  my: {
    borderColor: theme.palette.other.progress.counters.my,
  },
  myText: {
    color: theme.palette.other.progress.counters.my,
  },
  avg: {
    borderColor: theme.palette.other.progress.counters.avg,
  },
  avgText: {
    color: theme.palette.other.progress.counters.avg,
  },
  link: {
    fontWeight: '500',
  },
}));
