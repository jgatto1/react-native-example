import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useReachOutTrustedPeopleAddStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  closeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  closeButton: {
    color: theme.palette.selected.primary,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: alphaRGB(theme.palette.primary, 0.3),
    width: 60,
    height: 60,
    borderRadius: 10000,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
  doneButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    backgroundColor: theme.palette.divider.accent,
  },
}));
