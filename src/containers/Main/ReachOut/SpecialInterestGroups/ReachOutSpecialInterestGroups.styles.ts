import { makeStyle } from '@hooks/themed-style.hook';

export const useReachOutSpecialInterestGroupsStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  divider: {
    backgroundColor: theme.palette.divider.accent,
    borderColor: theme.palette.divider.accent,
  },
  groupContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupNameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexShrink: 1,
  },
  groupButton: {
    paddingHorizontal: 10,
    minWidth: 70,
  },
  suggestButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textInput: {
    minHeight: 80,
  },
}));
