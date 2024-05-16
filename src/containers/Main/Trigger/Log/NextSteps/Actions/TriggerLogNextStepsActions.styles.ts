import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useTriggerLogNextStepsActionsStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    paddingHorizontal: 10,
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  cancelButtonText: {
    color: theme.palette.text.primary,
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: 290,
  },
  actionButtonText: {
    fontSize: 12,
  },
}));
