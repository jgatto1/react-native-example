import { makeStyle } from 'providers/hooks/themed-style.hook';

export const useCommitmentStyles = makeStyle(() => ({
  root: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  weekCard: {
    width: '100%',
    marginBottom: 24,
  },
  weekText: {
    padding: 6,
  },
  text: {
    flex: 1,
  },
  question: {
    width: '100%',
    marginBottom: 16,
  },
  postButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: { borderWidth: 0, borderRadius: 4, paddingVertical: 16, marginTop: 10 },
  shareButton: {
    width: 92,
    height: 42,
    paddingHorizontal: 0,
  },
}));
