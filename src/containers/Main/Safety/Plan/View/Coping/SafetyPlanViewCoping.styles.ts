import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPlanViewCopingStyles = makeStyle((theme) => ({
  root: {
    marginTop: 15,
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
    borderWidth: 1,
  },
  newPost: {
    backgroundColor: 'transparent',
  },
  exportPlan: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
