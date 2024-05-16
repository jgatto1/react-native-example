import { makeStyle } from '@hooks/themed-style.hook';

export const useARCameraStyles = makeStyle((theme) => ({
  root: {
    position: 'relative',
    flex: 1,
  },
  topButton: {
    position: 'absolute',
    top: 50,
    width: 100,
    height: 40,
    backgroundColor: theme.palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    flexDirection: 'row',
  },
  topButtonText: {
    color: theme.palette.background.alternative,
  },
  exitButton: {
    left: -2,
  },
  infoButton: {
    right: -2,
  },
  modalContainer: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modal: {
    backgroundColor: theme.palette.background.alternative,
    borderWidth: 2,
    width: '99%',
    borderColor: theme.palette.primary,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  modalGifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  modalText: {
    flexGrow: 1,
    maxWidth: 200,
    justifyContent: 'center',
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 30,
  },
  modalButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  photoButtonText: {
    color: theme.palette.text.accent,
  },
  flipRotate: {
    transform: [{ scaleX: -1 }],
  },
  rotateSVG: {
    color: theme.palette.background.alternative,
  },
  modalRoot: {
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  modalBottomSpace: {
    flex: 1,
  },
  modalTop: {
    flex: 80,
  },
  modalMiddle: {
    flex: 15,
    backgroundColor: theme.palette.selected.primary,
  },
  postContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInputView: {
    width: '100%',
  },
  postInput: {
    height: 110,
  },
  postButtons: {
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  postSaveButton: {
    flexGrow: 1,
  },
  modalImageUrl: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    height: 320,
    //width: 170,
  },
}));
