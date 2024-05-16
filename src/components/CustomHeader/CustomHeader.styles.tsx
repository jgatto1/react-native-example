import { makeStyle } from 'providers/hooks/themed-style.hook';
import { Platform } from 'react-native';

export const usePopupStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.background.principal,
    position: 'absolute',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: Platform.OS === 'android' ? 56 : 0,
    width: '100%',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 3,
  },
  fakeHeaderShadow: {
    height: 1,
    width: '100%',
    backgroundColor: theme.palette.background.principal,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    elevation: 2,
    marginBottom: 8,
  },
  popupContent: {
    padding: 16,
    elevation: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {},
}));
