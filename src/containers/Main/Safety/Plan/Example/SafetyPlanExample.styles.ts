import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPlanExampleStyles = makeStyle((theme) => ({
  root: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleContainer: {
    width: '100%',
  },
  divider: {
    borderColor: theme.palette.other.safety.divider.color,
    marginVertical: 8,
    borderWidth: 0.6,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
