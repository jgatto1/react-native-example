import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useReachOutMessagesStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 12,
  },
  title: {
    color: theme.palette.text.title,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  cardIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardIconText: {
    color: theme.palette.selected.primary,
  },
  cardTextContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableSwitch: {
    color: theme.palette.primary,
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
  button: {
    color: theme.palette.text.accent,
  },
  personListLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    marginBottom: 10,
  },
  available: {
    color: alphaRGB(theme.palette.primary, 0.7),
  },
  notAvailable: {
    color: alphaRGB(theme.palette.error.primary, 0.7),
  },
  userCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarContainer: {
    margin: 5,
    minWidth: 50,
    minHeight: 50,
  },
  mockAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10000,
    backgroundColor: alphaRGB(theme.palette.primary, 0.5),
    borderWidth: 1,
    borderColor: alphaRGB(theme.palette.primary, 0.8),
  },
  userCardContentName: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '80%',
    marginLeft: 5,
    flexGrow: 1,
  },
  helpMeCopeCard: {
    position: 'relative',
  },
  helpMeCopeUnreadBadge: {
    position: 'absolute',
    top: -8,
    left: -8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10000,
    backgroundColor: alphaRGB(theme.palette.error.primary, 0.9),
  },
  helpMeCopeUnreadText: {
    color: theme.palette.text.accent,
  },
}));
