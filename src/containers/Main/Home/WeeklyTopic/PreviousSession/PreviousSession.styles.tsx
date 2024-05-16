import { makeStyle } from 'providers/hooks/themed-style.hook';

export const usePreviousSessionStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    padding: 16,
  },
  feedbackBlock: {
    flex: 1,
  },
  newPost: {
    width: '100%',
    paddingHorizontal: 0,
  },
  recording: {
    flex: 1,
    alignItems: 'center',
  },
  recordButton: {
    width: 250,
  },
  pickerOpener: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.alternative,
  },
}));
