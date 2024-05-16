import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginForgotPasswordStyles = makeStyle((theme) => ({
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
  inputErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputErrorSVG: {
    color: theme.palette.darkRed.error,
  },
  sendButton: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 12.5,
  },
  validCode: {
    backgroundColor: theme.palette.darkRed.primary,
    paddingVertical: 5,
  },
  resendCodeContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeField: {
    paddingHorizontal: 40,
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
}));
