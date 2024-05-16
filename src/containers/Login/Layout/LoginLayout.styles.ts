import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginLayoutStyles = makeStyle((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f6f2',
  },
  root: {
    paddingHorizontal: 40,
  },
  rootView: {
    flex: 1,
  },
  back: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backSVG: {
    color: theme.palette.primary,
  },
  backText: {
    marginLeft: 3,
    color: theme.palette.primary,
  },
  logoSubtitle: {
    marginTop: 10,
  },
  logoImageContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  appName: {
    fontFamily: 'AGaramondPro-Regular',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  appNameS: {
    fontFamily: 'SabonLTStd-Roman',
  },
  appNameWare: {
    fontFamily: 'SabonLTStd-Roman',
  },
  site: {
    color: theme.palette.primary,
  },
  siteContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 20,
  },
}));
