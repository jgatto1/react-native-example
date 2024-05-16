import { makeStyle } from '@hooks/themed-style.hook';

export const usePowerUpsStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.background.principal,
    paddingHorizontal: 12,
    flex: 1,
  },
  safeRoot: {
    flex: 1,
  },
  title: {
    color: theme.palette.text.title,
  },
  description: {
    marginTop: 20,
  },
  card: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '80%',
    borderRadius: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  middleButton: {
    marginVertical: 15,
  },
}));
