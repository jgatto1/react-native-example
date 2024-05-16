import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useProgressSendStyles = makeStyle((theme) => ({
  rootMain: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  modalMiddle: {
    backgroundColor: theme.palette.divider.accent,
    flex: 10,
  },
  modalTop: {
    flex: 35,
  },
  modalRoot: {
    flex: 100,
    justifyContent: 'center',
    paddingTop: 0,
  },
  modalButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendReport: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  toInputs: {
    width: '80%',
    marginLeft: 15,
    flexGrow: 1,
    height: 35,
    paddingVertical: 3,
  },
  toContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  toChip: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    backgroundColor: theme.palette.accent,
    borderRadius: 100,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toText: {
    marginHorizontal: 3,
  },
  toChipSVG: {
    color: theme.palette.text.primary,
  },
  confirmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmInput: {
    width: '60%',
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  schedulePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderRightWidth: 0.4,
    borderRadius: 2,
    borderColor: alphaRGB(theme.palette.text.primary, 0.7),
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  scheduleMoreSVG: {
    color: theme.palette.primary,
  },
  scheduleButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
}));
