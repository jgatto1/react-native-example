import { makeStyle } from 'providers/hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export default makeStyle((t) => ({
  container: {
    flex: 1,
    backgroundColor: t.palette.background.principal,
  },
  content: {
    // flex: 0,
  },
  headerImg: { width: Dimensions.get('window').width, height: 180 },
  welcome: { display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  payOptions: { marginHorizontal: 10 },
  space: { marginTop: 40 },
  purchases: { marginTop: 15 },
  itemTitle: { color: 'white', fontWeight: 'bold' },
  itemCategory: { color: 'white', fontSize: 20 },
  itemPrice: { color: 'white' },
  itemDescription: { color: 'white', maxWidth: '50%' },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  terms: { color: '#e17152', marginBottom: 20 },
  paymentItem: {
    backgroundColor: '#e17152',
    borderRadius: 5,
    marginTop: 10,
    padding: 12,
  },
  paymentChild: {
    flexGrow: 1,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  logoutBtn: {
    backgroundColor: '#e17152',
    borderRadius: 4,
    margin: 10,
    alignSelf: 'flex-start',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    borderRadius: 25,
    marginTop: 15,
    height: 10,
    width: 10,
    marginHorizontal: 4,
  },
  indicatorWrapper: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
}));
