import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useSafetySurpriseStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
  },
  title: {
    color: theme.palette.text.title,
    paddingHorizontal: 50,
    fontFamily: 'Montserrat-Italic',
    // fontWeight: '400',
  },
  divider: {
    borderWidth: 0.1,
  },
  list: {
    overflow: 'visible',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    flex: 1,
  },
  autoScrolling: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  scrollableContainer: {
    width: Dimensions.get('window').width * 2.8,
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  listItem: {
    overflow: 'visible',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 2.8,
    height: '90%',
    backgroundColor: theme.palette.background.principal,
  },
  bubble: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: theme.palette.primary,

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
