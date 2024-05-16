import { makeStyle } from '@hooks/themed-style.hook';

export const useCommitmentCongratsModalStyles = makeStyle(() => ({
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 160,
  },
  congratsOk: {
    marginTop: 10,
    width: 160,
  },
}));
