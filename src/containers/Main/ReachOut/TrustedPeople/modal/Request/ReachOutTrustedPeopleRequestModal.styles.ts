import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useReachOutTrustedPeopleRequestModalStyles = makeStyle((theme) => ({
  modalRoot: {
    paddingTop: '50%',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  modalTop: {
    flex: 40,
  },
  modalMiddle: {
    flex: 10,
    backgroundColor: theme.palette.selected.primary,
  },
  initialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    paddingHorizontal: 10,
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  closeButtonText: {
    color: theme.palette.text.primary,
  },
  continueButton: {
    paddingHorizontal: 10,
  },
  endButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
