import { Dimensions, Platform } from 'react-native';
import { makeStyle } from '@hooks/themed-style.hook';

export const useLoginStyle = makeStyle((theme) => ({
  root: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: theme.palette.background.principal,
  },
  rootScroll: {
    backgroundColor: theme.palette.background.principal,
  },
  rootScrollContainer: {
    backgroundColor: theme.palette.background.principal,
  },
  loadingView: {
    backgroundColor: theme.palette.background.principal,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    color: theme.palette.error.primary,
  },
  headerContainer: {
    // flex: 1,
    height: 35,
    zIndex: 1,
  },
  header: {
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    elevation: 1,
  },
  headerText: {
    // marginTop: Platform.OS === 'android' ? 15 : 35,
    // marginBottom: Platform.OS === 'android' ? 15 : 10,
    fontWeight: 'bold',
    fontSize: 17,
    borderWidth: 0,
    color: '#4a4e56',
  },
  formContainer: {
    backgroundColor: theme.palette.background.principal,
    flexGrow: Platform.OS === 'ios' ? 1 : 0,
  },
  formHeight: {
    height: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeText: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
  welcomeTextAppName: {
    fontStyle: 'italic',
  },
  sloganText: {
    marginTop: 10,
    color: theme.palette.text.primary,
    fontWeight: '400',
  },
  credentialsContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  inputLabel: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 5,
    borderColor: theme.palette.border.primary,
    borderRadius: 2,
    borderWidth: 2,
    fontSize: 15,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingLeft: 20,
    fontFamily: 'Montserrat',
  },
  inputError: {
    borderColor: theme.palette.error.primary,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: 250,
    height: 35,
    paddingVertical: 0,
    paddingBottom: Platform.OS === 'android' ? 10 : 0,
  },
  buttonText: {
    textAlignVertical: 'center',
    color: theme.palette.text.accent,
    marginRight: 4,
    marginStart: 8,
    lineHeight: 24,
  },
  containerTextButton: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  subInfo: {
    textAlign: 'center',
    marginTop: 20,
  },
  appInfo: {
    marginTop: 30,
    opacity: 0.7,
    width: '100%',
    textAlign: 'right',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
