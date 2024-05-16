import { makeStyle } from '@hooks/themed-style.hook';

export const useARTreeViroStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
  },
}));
