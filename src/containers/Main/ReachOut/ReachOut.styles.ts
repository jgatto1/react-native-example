import { makeStyle } from '@hooks/themed-style.hook';

export const useReachOutStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  button: {
    color: theme.palette.other.safety.button.background,
  },
}));
