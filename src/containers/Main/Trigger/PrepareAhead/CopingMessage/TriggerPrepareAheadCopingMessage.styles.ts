import { makeStyle } from '@hooks/themed-style.hook';

export const useTriggerPrepareAheadCopingMessageStyles = makeStyle((theme) => ({
  main: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  dropdownSVG: {
    color: theme.palette.primary,
  },
  linkSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: '#000',
    backgroundColor: theme.palette.background.alternative,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  linkSelectorText: {
    flexGrow: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    minHeight: 100,
  },
}));
