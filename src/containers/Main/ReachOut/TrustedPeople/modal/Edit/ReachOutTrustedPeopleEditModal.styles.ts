import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useReachOutTrustedPeopleEditModalStyles = makeStyle((theme) => ({
  root: {
    paddingHorizontal: 10,
  },
  modalRoot: {
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  modalRootEditDone: {
    paddingTop: 230,
  },
  editModal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalTop: {
    flex: 40,
  },
  modalMiddle: {
    flex: 10,
    backgroundColor: theme.palette.selected.primary,
  },
  modalButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: '70%',
  },
  modalButtonIcon: {
    color: theme.palette.text.accent,
    marginRight: 10,
  },
  modalEditButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  editDone: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.palette.text.primary,
  },
  editProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
