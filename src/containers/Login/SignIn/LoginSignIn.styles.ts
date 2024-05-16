import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginSignInStyles = makeStyle((theme) => ({
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
    alignItems: 'center',
  },
  inputErrorText: {
    color: theme.palette.darkRed.error,
    fontWeight: '500',
  },
  passVisible: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    top: 0,
    right: 10,
    justifyContent: 'center',
  },
  visible: {
    color: theme.palette.gray['400'],
  },
  visibleFocus: {
    color: theme.palette.gray['700'],
  },
  passwordBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPasswordText: {
    color: theme.palette.primary,
  },
  forgotPassword: { flex: 1, justifyContent: 'flex-end', flexDirection: 'row' },
  logInButton: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 12.5,
    borderRadius: 8,
  },
}));
