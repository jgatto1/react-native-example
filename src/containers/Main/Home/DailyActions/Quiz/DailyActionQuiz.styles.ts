import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useDailyActionQuizStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.background.principal,
    flex: 1,
    paddingHorizontal: 12,
  },
  rootSafe: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    flexShrink: 1,
    alignItems: 'center',
    borderColor: theme.palette.primary,
    backgroundColor: alphaRGB(theme.palette.background.principal, 0.1),
  },
  smallButton: {
    paddingHorizontal: 5,
  },
  buttonSelected: {
    borderWidth: 1,
    borderColor: theme.palette.selected.primary,
    backgroundColor: theme.palette.selected.primary,
  },
  buttonText: {
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    fontWeight: '400',
    color: theme.palette.text.primary,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  buttonSelectedText: {
    color: theme.palette.text.accent,
    fontWeight: 'bold',
  },
  buttonTextCenter: {
    textAlign: 'center',
  },
  optionsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  letter: {
    marginRight: 15,
  },
  choiceView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categorizeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: '100%',
  },
  categorizeColumnTitle: {
    marginBottom: 20,
  },
  categorizeColumn: {
    maxWidth: '100%',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonAnswer: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.66,
    marginBottom: 70,
  },
}));
