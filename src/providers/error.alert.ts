import { Alert } from 'react-native';

export const showAlertIfNetworkError = (err: Error) => {
  if (err && err.message && typeof err.message === 'string' && err.message.startsWith('Network Error')) {
    Alert.alert('Network error');
  }
};
