import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useAvatarStyles = makeStyle((theme) => ({
  defaultContainer: {
    borderRadius: 10000,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  circle: {
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  svg: {
    color: theme.palette.primary,
  },
}));
