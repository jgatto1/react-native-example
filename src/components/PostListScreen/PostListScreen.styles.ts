import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const usePostListScreenStyles = makeStyle((theme) => ({
  container: {
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newPostButton: {
    justifyContent: 'center',
    height: 40,
  },
  newPostIcon: {
    marginRight: 5,
  },

  overlay: {
    opacity: 0.1,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.15,
  },

  modalHeader: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '90%',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 15,
  },
  modalFavoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalFavoritesCheck: {
    borderRadius: 0,
    marginRight: -3,
    borderColor: theme.palette.primary,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
}));
