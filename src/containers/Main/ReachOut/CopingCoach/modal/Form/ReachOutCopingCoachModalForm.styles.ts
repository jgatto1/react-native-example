import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useReachOutCopingCoachModalFormStyles = makeStyle((theme) => ({
  checkboxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    borderRadius: 0,
    borderColor: theme.palette.primary,
  },
  checkboxError: {
    borderColor: theme.palette.error.primary,
    backgroundColor: theme.palette.error.primary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    paddingHorizontal: 10,
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  cancelButtonText: {
    color: theme.palette.text.primary,
  },
  nextButton: {
    paddingHorizontal: 22,
  },
}));
