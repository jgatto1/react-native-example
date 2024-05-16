import { makeStyle } from '@hooks/themed-style.hook';

export const useTriggerLogStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    color: theme.palette.text.title,
  },
  levelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.background.alternative,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  levelSelectorText: {
    flexGrow: 1,
  },
  levelSelectorSVG: {
    color: theme.palette.primary,
  },
  triggers: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  triggers1: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  triggers2: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    minWidth: 250,
  },
  nextButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
    width: 250,
  },
  geoDisclaimerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
