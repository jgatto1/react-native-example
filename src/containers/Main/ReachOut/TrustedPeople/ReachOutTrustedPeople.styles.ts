import { makeStyle } from '@hooks/themed-style.hook';

export const useReachOutTrustedPeopleStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
  },
  rootScroll: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    color: theme.palette.text.title,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewButton: {
    paddingHorizontal: 5,
  },
  personCard: {
    marginVertical: 10,
    paddingVertical: 16,
  },
  personCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editSvg: {
    color: theme.palette.primary,
  },
  buttonSvg: {
    color: theme.palette.background.alternative,
  },
  button: {
    backgroundColor: theme.palette.primary,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: theme.palette.text.accent,
    fontWeight: 'bold',
    flexShrink: 1,
    fontSize: 11,
  },
}));
