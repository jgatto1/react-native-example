import { makeStyle } from '@hooks/themed-style.hook';

export const useProfileFormInformationStyles = makeStyle(() => ({
  root: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
  },
  inputContainer: {
    flex: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
