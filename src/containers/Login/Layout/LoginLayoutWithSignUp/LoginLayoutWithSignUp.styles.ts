import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginLayoutWithSignUpStyles = makeStyle((theme) => ({
  orContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  orLine: {
    alignSelf: 'stretch',
    height: 0.7,
    flexGrow: 1,
    backgroundColor: theme.palette.gray[400],
  },
  orText: {
    marginHorizontal: 10,
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signUp: {
    color: theme.palette.primary,
  },
}));
