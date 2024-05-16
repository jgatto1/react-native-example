import { makeStyle } from '@hooks/themed-style.hook';

export const useTriggerCustomizePrepStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageContainer: {},
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    borderRadius: 0,
    borderColor: theme.palette.primary,
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
  saveButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
