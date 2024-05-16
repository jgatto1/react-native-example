import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useSchedulePickerStyles = makeStyle((theme) => ({
  pickerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPlaceholder: {
    color: alphaRGB('rgb(0, 0, 0)', 0.2),
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthInput: {
    flex: 2,
  },
  dayInput: {
    marginHorizontal: 6,
    flex: 2,
  },
  yearInput: {
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: theme.palette.primary,
    flex: 4,
  },
  hourInput: {
    flex: 2,
    marginRight: 2,
  },
  minuteInput: {
    marginHorizontal: 2,
    flex: 2,
  },
  amInput: {
    marginLeft: 5,
    flex: 3,
  },
  dateTimePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
  },
  input: {
    paddingLeft: 0,
    minWidth: 30,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: theme.palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
}));
