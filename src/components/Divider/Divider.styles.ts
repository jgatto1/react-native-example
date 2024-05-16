import { makeStyle } from '@hooks/themed-style.hook';

export const useDividerStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.divider.color,
    borderWidth: 1,
    borderColor: theme.palette.divider.color,
  },
  horizontal: {
    width: '100%',
    height: 1,
  },
  vertical: {
    height: '100%',
    width: 1,
  },
}));
