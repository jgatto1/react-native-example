import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginSignUpStyles = makeStyle((theme) => ({
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
  inputErrorSVG: {
    color: theme.palette.darkRed.error,
  },
  passwordInputContainer: {
    position: 'relative',
    width: '100%',
  },
  inputErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputErrorText: {
    color: theme.palette.darkRed.error,
    fontWeight: '500',
  },
  passVisible: {
    position: 'absolute',
    alignItems: 'center',
    top: 13,
    right: 10,
    justifyContent: 'center',
  },
  visible: {
    color: theme.palette.gray['400'],
  },
  visibleFocus: {
    color: theme.palette.gray['700'],
  },
  pwdHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertSVG: {
    color: theme.palette.darkRed.error,
  },
  passHintTextAlert: {
    color: theme.palette.darkRed.error,
  },
  doneSVG: {
    color: theme.palette.lightGreen.done,
  },
  passHintTextOk: {
    color: theme.palette.lightGreen.done,
  },
  signUpButton: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 12.5,
    borderRadius: 8,
  },
  signInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signIn: {
    color: theme.palette.primary,
  },
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.56)',
    paddingHorizontal: 15,
  },
  modalCloseContainer: {
    alignItems: 'flex-end',
  },
  modalCloseSVG: {
    color: theme.palette.gray['400'],
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    paddingHorizontal: 10,
    width: '100%',
  },
  modalContent: {
    paddingHorizontal: 5,
  },
  validCode: {
    backgroundColor: theme.palette.darkRed.primary,
    paddingVertical: 5,
  },
  codeField: {
    paddingHorizontal: 40,
  },
  resendCodeContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 28,
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    borderColor: theme.palette.gray['700'],
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  resend: {
    color: theme.palette.darkRed.primary,
    textDecorationLine: 'underline',
  },
  signUpContainer: {},
}));
