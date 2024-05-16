import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useTriggerLogNextStepsStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 15,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    borderRadius: 0,
    borderColor: theme.palette.primary,
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
