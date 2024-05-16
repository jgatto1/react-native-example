import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useDailySafetyCheckStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.background.principal,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 12,
    lineHeight: 30,
    fontSize: 23,
    fontStyle: 'italic',
    color: theme.palette.other.onBoarding.title.color,
  },

  nextStepCard: {
    marginTop: 10,
  },

  nextStepCardTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextStepCardTitle: {
    marginBottom: 5,
    fontWeight: 'bold',
  },

  checksContainer: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
  },

  checkText: {
    fontWeight: 'bold',
  },

  cancel: {
    paddingHorizontal: 15,
    backgroundColor: alphaRGB(theme.palette.primary, 0.3),
  },
  cancelText: {
    color: theme.palette.text.primary,
  },
  logIt: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  logItIndicator: {
    paddingTop: 5,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkedTodoButton: {
    marginVertical: 5,
    paddingHorizontal: 5,
    width: '70%',
  },
  checkedTodoButtonText: {
    fontSize: 11,
  },
  noteCard: {
    marginTop: 15,
  },
  noteTextInput: {
    height: 300,
  },
  noteButtons: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  noteButton: {
    paddingHorizontal: 10,
    marginLeft: 15,
  },
  noteButtonText: {
    fontSize: 12,
  },
}));
