import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPlanStyles = makeStyle(() => ({
  root: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    lineHeight: 24,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 165,
  },
}));
