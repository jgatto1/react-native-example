import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useSafetyBoomerangCardStyles = makeStyle((theme) => ({
  boomerangCard: {
    borderWidth: 2.5,
    borderColor: theme.palette.primary,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 12,
  },
  button: {
    paddingHorizontal: 10,
  },
  cancelButtonContainer: {
    alignItems: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: 10,
    backgroundColor: alphaRGB(theme.palette.primary, 0.15),
  },
  cancelButtonText: {
    color: 'black',
  },
}));
