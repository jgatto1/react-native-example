import { makeStyle } from '@hooks/themed-style.hook';

export const useTriggerStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 15,
  },
  logButton: {
    color: theme.palette.other.trigger.log.button.color,
  },
  button: {
    color: theme.palette.other.safety.button.background,
  },
  image: {
    width: '100%',
    height: 200,
  },
}));
