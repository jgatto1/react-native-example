import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginSocialStyles = makeStyle((_theme) => ({
  googleSocialButton: {
    position: 'relative',
    paddingVertical: 12.9,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  fbSocialButton: {
    position: 'relative',
    paddingVertical: 12.9,
    paddingHorizontal: 10,
    backgroundColor: '#3578eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  appleSocialButton: {
    position: 'relative',
    paddingVertical: 12.9,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  socialButtonImg: {
    position: 'absolute',
    left: 10,
    width: 27,
    height: 27,
  },
  fbSocialButtonText: {
    color: 'white',
  },
  appleSocialButtonText: {
    color: 'white',
  },
}));
