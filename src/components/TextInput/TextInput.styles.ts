import { makeStyle } from '@hooks/themed-style.hook';

export const useTextInputStyles = makeStyle((theme) => ({
  root: {
    color: 'black',
    width: '100%',
    marginVertical: 5,
    borderColor: theme.palette.border.primary,
    borderWidth: 2,
    fontSize: 12,
    borderRadius: 3,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Montserrat',
  },
  disabled: {
    backgroundColor: 'rgb(227,227,227)',
  },
  inputError: {
    borderColor: theme.palette.error.primary,
  },
}));
