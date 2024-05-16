import { makeStyle } from '@hooks/themed-style.hook';

export const useSpaceStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
  },
}));
