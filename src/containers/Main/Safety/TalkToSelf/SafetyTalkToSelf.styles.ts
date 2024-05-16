import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyTalkToSelfStyles = makeStyle(() => ({
  root: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
