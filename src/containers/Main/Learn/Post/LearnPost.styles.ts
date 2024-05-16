import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useLearnPostStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  modalMiddle: {
    backgroundColor: theme.palette.divider.accent,
  },
  reflectionInput: {
    height: 150,
  },
  reflectionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    color: theme.palette.divider.accent,
    fontSize: 18,
  },
  html: {
    fontFamily: `${theme.fontFamily.primary}, sans`,
    fontSize: 15,
    fontWeight: '300',
    lineHeight: 15,
    marginVertical: 5,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: theme.palette.other.learn.post.footer.background,

    shadowColor: 'rgba(0,0,0, .15)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
  },
  footerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewNotesPress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewNotes: {
    color: alphaRGB(theme.palette.error.primary, 0.8),
  },
  notePressable: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: theme.palette.background.alternative,
  },
}));
