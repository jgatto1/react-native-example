import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useNewPostStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 15,
    backgroundColor: theme.palette.background.principal,
  },
  divider: {
    marginVertical: 10,
  },
  textInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoIconButton: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    marginLeft: 10,
  },
  photoButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  photoButtonText: {
    fontSize: 12,
  },
  photoButtonIcon: {
    marginLeft: 11,
    marginRight: 7,
    color: 'white',
  },
  photoViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  photoView: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.5,
  },
  linkInputContainer: {
    flexGrow: 1,
    marginLeft: 10,
  },
  buttons: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonBackContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexGrow: 1,
  },
  postButtonsContainer: {
    flexDirection: 'row',
  },
  buttonBack: {
    backgroundColor: alphaRGB(theme.palette.primary, 0.3),
  },
  buttonBackText: {
    color: theme.palette.text.primary,
  },
  buttonsInfo: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonsInfoContainer: {
    marginTop: 10,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonsInfoText: {
    textAlign: 'right',
    lineHeight: 20,
  },
}));
