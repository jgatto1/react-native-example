import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPlanWizardEndStyles = makeStyle((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    color: theme.palette.text.title,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  message: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.alternative,
    width: '100%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
}));
