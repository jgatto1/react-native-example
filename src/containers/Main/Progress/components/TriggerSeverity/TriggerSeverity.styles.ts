import { makeStyle } from '@hooks/themed-style.hook';

export const useTriggerSeverityStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
  },
  card: {
    paddingHorizontal: 0,
  },
  cardLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  severityContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    maxWidth: 400,
    minWidth: 200,
  },
  dayContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    minWidth: 18,
  },
  dayBox: {
    height: 16,
    width: 16,
    borderWidth: 0.5,
    borderColor: theme.palette.primary,
  },
  colorReferenceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    maxWidth: 500,
  },
  colorReference: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
