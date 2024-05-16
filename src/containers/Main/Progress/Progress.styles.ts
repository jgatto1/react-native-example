import { makeStyle } from '@hooks/themed-style.hook';

export const useProgressStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
    width: 250,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tool: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
  },
  toolSVG: {
    color: theme.palette.primary,
  },
}));
