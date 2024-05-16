import { makeStyle } from 'providers/hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useModalStyles = makeStyle((theme) => ({
  root: {
    paddingTop: 120,
    width: Dimensions.get('window').width,
    flex: 4,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  closeContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  bottomSpace: {
    flex: 2,
  },
  keyboard: {
    flex: 1,
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
    backgroundColor: theme.palette.background.principal,
    borderRadius: 3,
    paddingHorizontal: 7,
    width: '100%',
  },
  modalContent: {
    padding: 7,
    paddingHorizontal: 20,
  },
  passwordInputContainer: {
    position: 'relative',
    width: '100%',
  },
  credentialInput: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingTop: 0,
    marginVertical: 0,
    marginTop: 5,
    paddingHorizontal: 5,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: theme.palette.gray['400'],
  },
  credentialInputFocus: {
    borderWidth: 2,
    borderColor: theme.palette.darkRed.primary,
  },
  invalidCode: { color: theme.palette.darkRed.error, textAlign: 'center' },
  inputErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputErrorSVG: {
    color: theme.palette.darkRed.error,
  },
  sendButton: {
    backgroundColor: theme.palette.darkRed.primary,
    paddingVertical: 5,
  },
  validCode: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 15,
    borderRadius: 8,
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
    color: theme.palette.primary,
  },
  closeBtn: {
    width: 50,
    height: 50,
    display: 'flex',
    paddingTop: 14,
    alignItems: 'center',
  },
  btnContainer: {
    position: 'absolute',
    marginHorizontal: 14,
    zIndex: 100,
    elevation: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));
