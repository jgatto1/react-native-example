import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPlanViewStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 12,
  },
  pressable: {
    height: 40,
    backgroundColor: theme.palette.background.alternative,
    borderWidth: 1,
    borderColor: theme.palette.other.safety.divider.color,
    borderRadius: 3,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  selected: {
    backgroundColor: theme.palette.other.safety.divider.color,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
