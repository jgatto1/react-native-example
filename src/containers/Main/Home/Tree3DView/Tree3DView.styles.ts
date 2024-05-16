import { makeStyle } from '@hooks/themed-style.hook';

export const useTree3DViewStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
  },
  arContainer: {
    // position: 'relative',
    overflow: 'hidden',
    height: 220,
    borderWidth: 0,
    borderRadius: 10,
  },
  arTreeProgress: {
    height: 220,
  },
  arButton: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  arButtonRotate: {
    position: 'absolute',
    top: 100,
  },
  arButtonRotateLeft: {
    left: 15,
  },
  arButtonRotateRight: {
    right: 15,
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  arButtonSVG: {
    color: theme.palette.divider.color,
  },
}));
