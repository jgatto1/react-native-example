import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useReachOutCopingCoachModalStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.primary,
  },
  modalRoot: {
    maxHeight: Dimensions.get('window').height * 0.8,
    paddingTop: -10,
  },
  infoRoot: {
    paddingTop: '100%',
  },
  modalRootDone: {
    justifyContent: 'center',
    paddingTop: '40%',
  },
  modalMiddle: {
    flex: 10,
    backgroundColor: theme.palette.selected.primary,
  },
  modalBottom: {
    flex: 9,
  },
  topDone: {
    flex: 15,
  },
  middleDone: {
    flex: 3,
  },
  bottomDone: {
    flex: 11,
  },
  cardContent: {
    paddingHorizontal: 15,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullBioScroll: {
    height: Dimensions.get('window').height * 0.42,
    maxHeight: 600,
  },
  reachOutButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
