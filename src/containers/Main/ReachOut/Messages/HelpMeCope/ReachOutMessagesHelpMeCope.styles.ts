import { makeStyle } from '@hooks/themed-style.hook';

export const useReachOutMessagesHelpMeCopeStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 15,
  },
  cardHeader: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    flexGrow: 1,
    lineHeight: 22,
  },
  cardForm: {
    backgroundColor: theme.palette.background.alternative,
  },
  moreIcon: {
    color: theme.palette.primary,
  },
  sendButtonContainer: {
    alignItems: 'flex-end',
  },
  helpCopeCard: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpCopeText: {
    flexGrow: 1,
    flexShrink: 1,
  },
  helpCopeDelete: {
    color: theme.palette.selected.primary,
  },
  helpMeCopeCard: {
    position: 'relative',
  },
  helpMeCopeUnreadSVG: {
    position: 'absolute',
    right: -8,
    top: -8,
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 1000,
    color: theme.palette.error.primary,
  },
}));
