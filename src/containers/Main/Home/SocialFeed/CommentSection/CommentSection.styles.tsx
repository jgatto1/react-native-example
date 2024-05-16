import { makeStyle } from 'providers/hooks/themed-style.hook';

export const useCommentSectionStyle = makeStyle((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette.background.alternative,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerIndicator: {
    margin: 15,
  },
  inputContainer: {
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: theme.palette.background.principal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: 6,
    padding: 6,
    paddingTop: 8,
    borderRadius: 4,
    flex: 6,
    minHeight: 33,
    maxHeight: 300,
    backgroundColor: theme.palette.background.alternative,
  },
  submitButton: {
    backgroundColor: theme.palette.primary,
    borderRadius: 70,
    height: 35,
    width: 35,
  },
}));
