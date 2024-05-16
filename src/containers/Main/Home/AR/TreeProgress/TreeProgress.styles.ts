import { makeStyle } from '@hooks/themed-style.hook';

export const useTreeProgressStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 5,
  },
  card: {
    height: 350,
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 15,
  },
  cardContent: {
    height: '100%',
    position: 'relative',
  },
  tree3dContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  headerFlex: {
    flex: 0.4,
  },
  bigFlex: {
    flex: 2,
  },
  midFlex: {
    flex: 2,
  },
  smallFlex: {
    flex: 3,
  },
  arButtonSVG: {
    color: theme.palette.divider.color,
  },
  divider: {
    flexGrow: 1,
  },
  dividerLine: {
    borderColor: theme.palette.primary,
  },
  thumbnail: {
    borderRadius: 10000,
    borderWidth: 4,
    borderColor: theme.palette.primary,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeDividerThumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullets: {
    paddingLeft: 20,
  },
  imagePreview: {
    width: 30,
    height: 30,
    borderRadius: 10000,
  },
  text: {
    lineHeight: 20,
  },
}));
