import { makeStyle } from 'providers/hooks/themed-style.hook';

export const useNextSessionStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    padding: 18,
    alignItems: 'center',
  },
  weekCard: {
    width: '100%',
    marginBottom: 20,
  },
  weekText: {
    padding: 6,
  },
  text: {
    flex: 1,
  },
  button: {
    width: 240,
    height: 42,
  },
  buttonText: {
    color: theme.palette.text.accent,
    padding: 18,
  },
  feedbackBlock: {
    flex: 1,
    alignItems: 'center',
  },
  newPost: {
    width: '100%',
  },
}));
