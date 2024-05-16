import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useTriggerPrepareAheadStyles = makeStyle((theme) => ({
  mainRoot: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  modalRoot: {
    flex: 2,
  },
  modalTop: {
    flex: 40,
  },
  modalMiddle: {
    flex: 10,
    backgroundColor: theme.palette.divider.accent,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleCard: {
    paddingHorizontal: 40,
  },
  scheduleCardCancelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  scheduleCardCancelButton: {
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  scheduleCardCancelButtonText: {
    color: theme.palette.text.primary,
  },
  activityButtonText: {
    fontSize: 13,
  },
}));
