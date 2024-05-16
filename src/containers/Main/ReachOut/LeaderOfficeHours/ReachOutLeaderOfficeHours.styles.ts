import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useReachOutLeaderOfficeHoursStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flex: 1,
    paddingHorizontal: 15,
  },
  requestButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButtonText: {
    fontSize: 12,
  },
  modalRoot: {
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.6,
  },
  modalTop: {
    flex: 32,
  },
  modalMiddle: {
    flex: 8,
    backgroundColor: theme.palette.selected.primary,
  },
  modalBottom: {
    flex: 12,
  },
  doneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
