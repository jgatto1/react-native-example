import { makeStyle } from '@hooks/themed-style.hook';

export const useRadioButtonsStyles = makeStyle((theme) => ({
  radioLabelStyle: {
    marginLeft: 10,
    fontFamily: theme.fontFamily.primary,
    color: theme.palette.text.primary,
    maxWidth: '90%',
    flexGrow: 1,
    flexShrink: 1,
  },
}));
