import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useDailyActionQuizModalStyles = makeStyle((theme) => ({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  image: {
    height: Dimensions.get('window').width * 0.25,
    width: Dimensions.get('window').width * 0.25,
    marginBottom: 15,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 12,
  },
  buttonCloseText: {
    color: theme.palette.text.primary,
  },
  button: {
    paddingHorizontal: 26,
  },
  closeButton: {
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  counter: {
    marginVertical: 7,
    fontWeight: 'bold',
    fontSize: 30,
    color: theme.palette.other.weeklyTopic.background,
  },
  congratsOk: {
    marginTop: 10,
  },
}));
