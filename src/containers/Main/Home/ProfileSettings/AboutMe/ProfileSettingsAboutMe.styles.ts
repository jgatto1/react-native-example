import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useProfileSettingsAboutMeStyles = makeStyle((theme) => ({
  container: {
    paddingHorizontal: 8,
    flex: 1,
    backgroundColor: theme.palette.background.principal,
  },
  fullText: {
    minHeight: 200,
  },
  description: {
    lineHeight: 23,
  },
  publicContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  saveButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSelected: {
    color: alphaRGB(theme.palette.text.primary, 0.5),
    marginVertical: 10,
    fontSize: 12,
  },
  emojiContainerWithoutBorder: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  chipContainer: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'scroll',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 200,
    marginHorizontal: 5,
    backgroundColor: theme.palette.other.weeklyTopic.background,
  },
  firstChip: {
    marginLeft: 0,
  },
  editGroupsContainer: {
    alignItems: 'flex-start',
  },
}));
