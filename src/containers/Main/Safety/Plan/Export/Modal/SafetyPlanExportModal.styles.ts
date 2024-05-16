import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

const rootSize = Dimensions.get('window');

export const useSafetyPlanExportModalStyles = makeStyle(() => ({
  root: {
    width: rootSize.width,
    height: rootSize.height,
  },
  emptyContainer: {
    flex: 1.9,
  },
  cardContainer: {
    flex: 10,
    paddingHorizontal: 12,
    width: rootSize.width,
  },
  card: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 280,
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 60,
  },
}));
