import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';
import { Platform } from 'react-native';

export const useSafetyPlanWizardStepStyles = makeStyle((theme) => ({
  container: {
    width: '100%',
    marginTop: Platform.OS === 'android' ? 20 : 10,
    paddingHorizontal: 15,
  },
  root: {
    marginBottom: 50,
    // height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainerFirst: {
    justifyContent: 'flex-end',
  },
  backButton: {
    backgroundColor: alphaRGB(theme.palette.primary, 0.2),
  },
  backButtonText: {
    color: 'black',
  },
  selectorContainer: {
    paddingVertical: 10,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    backgroundColor: theme.palette.background.alternative,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  suggestions: {
    maxHeight: 50,
    backgroundColor: 'white',
  },
  suggestion: {
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    borderColor: alphaRGB(theme.palette.primary, 0.5),
  },
  suggestionText: {
    paddingVertical: 5,
  },
}));
