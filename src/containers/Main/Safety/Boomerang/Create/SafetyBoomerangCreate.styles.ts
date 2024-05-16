import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyBoomerangCreateStyles = makeStyle((theme) => ({
  root: {
    marginTop: 10,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  scheduleButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weeklyCheckBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerOpener: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.alternative,
  },
  additionalTextInput: {
    minHeight: 80,
  },
  modalRoot: {
    paddingTop: 200,
    justifyContent: 'center',
  },
  modalTop: {
    flex: 30,
  },
  modalMiddle: {
    flex: 8,
    backgroundColor: theme.palette.divider.accent,
  },
  modalBottom: {
    flex: 20,
  },
  modalButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
