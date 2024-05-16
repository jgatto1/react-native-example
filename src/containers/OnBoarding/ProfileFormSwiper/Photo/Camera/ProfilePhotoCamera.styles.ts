import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

const dimension = Dimensions.get('screen');

export const useProfilePhotoCameraStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.alternative,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
    borderColor: 'black',
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
    width: 30,
    height: 30,
  },
  cameraContainer: {
    width: dimension.width * 0.81,
    height: dimension.width * 0.81,
    overflow: 'hidden',
    borderWidth: 8,
    borderRadius: 4000,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.palette.primary,
  },
  camera: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  photoPreview: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  captureContainer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  captureContainerCaptured: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  captureContainerDisabled: {
    display: 'none',
  },

  captureButtonText: {
    color: 'white',
  },
}));

export const useProfileAndroidPhotoCameraStyle = makeStyle((theme) => ({
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraInner: {
    borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
  },
  layout: {
    borderColor: theme.palette.background.alternative,
    alignSelf: 'center',
    borderWidth: Dimensions.get('window').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 2,
    width: Dimensions.get('window').height * 2,
  },
  layoutBorder: {
    alignSelf: 'center',
    borderWidth: 10,
  },
  closeContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
  },
  bottomButtonContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height - 130,
    right: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
