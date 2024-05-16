import { makeStyle } from '@hooks/themed-style.hook';

export default makeStyle((theme) => ({
  dropdown: {
    backgroundColor: theme.palette.background.alternative,
    paddingLeft: 8,
    height: 35,
    marginHorizontal: 1,
    // marginBottom: 8,
    zIndex: 0,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    fontFamily: theme.fontFamily.primary,
    shadowOpacity: 0.25,
    shadowRadius: 0.2,
    elevation: 3,
  },
  disabled: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: theme.palette.error.primary,
  },
  label: {
    color: theme.palette.accent,
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    color: theme.palette.primary,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  font: {
    fontSize: 12,
  },
  customDropdownItem: {
    marginLeft: 10,
    padding: 10,
    height: 40,
  },
}));
