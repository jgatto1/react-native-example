import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginResetPasswordStyles = makeStyle((theme) => ({
  modalScreen: {
    flex: 1,
    height: '30%',
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  modalCloseContainer: {
    alignItems: 'flex-end',
  },
  modalCloseSVG: {
    color: theme.palette.gray['400'],
  },
  modal: {
    backgroundColor: '#f1f6f2',
    borderRadius: 3,
    paddingHorizontal: 10,
    width: '100%',
  },
  modalContent: {
    paddingHorizontal: 5,
  },
  passwordInputContainer: {
    position: 'relative',
    width: '100%',
  },
  credentialInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#f1f6f2',
    fontSize: 15,
    borderColor: theme.palette.gray['400'],
  },
  credentialInputFocus: {
    borderWidth: 2,
    borderColor: theme.palette.primary,
  },
  passVisible: {
    position: 'absolute',
    alignItems: 'center',
    top: 13,
    right: 10,
    justifyContent: 'center',
  },
  visibleFocus: {
    color: theme.palette.gray['700'],
  },
  visible: {
    color: theme.palette.gray['400'],
  },
  pwdHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneSVG: {
    color: theme.palette.lightGreen.done,
  },
  alertSVG: {
    color: theme.palette.darkRed.error,
  },
  passHintTextOk: {
    color: theme.palette.lightGreen.done,
  },
  passHintTextAlert: {
    color: theme.palette.darkRed.error,
  },
  inputErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputError: {
    color: theme.palette.darkRed.error,
  },
  resetPassButton: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 12.5,
  },
}));
