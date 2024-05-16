import { makeStyle } from '@hooks/themed-style.hook';

export const useWeekMarkStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 5,
  },
  weeksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weeks: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  weekContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mark: {
    borderColor: theme.palette.other.progress.weeks.mark.off,
    backgroundColor: theme.palette.other.progress.weeks.mark.off,
    borderWidth: 2,
    borderRadius: 10000,
    width: '80%',
    marginTop: 13,
    marginBottom: 10,
  },
  on: {
    borderColor: theme.palette.other.progress.weeks.mark.on,
    backgroundColor: theme.palette.other.progress.weeks.mark.on,
  },
  p: {
    color: theme.palette.divider.accent,
  },
}));
