import { makeStyle } from '@hooks/themed-style.hook';
import { Platform } from 'react-native';

export const useHomeStyle = makeStyle((theme) => ({
  root: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    marginTop: 0,
    flex: 9,
  },
  content: {
    // flex: 1,
    alignContent: 'space-around',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  arContainerTree: {
    flex: 3,
    height: 200,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginBottom: 10,
  },

  arTreeProgressImageBig: {
    width: 250,
    height: 200,
  },
  arTreeProgressImageMid: {
    width: 130,
    height: 210,
  },
  arTreeProgressImageSmall: {
    marginBottom: 20,
    width: 120,
    height: 140,
  },
  navigationButtonsContainer: {
    flex: 3,
  },
  navButtonsFirstRow: {
    flexDirection: 'row',
  },
  navButtonsSecondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondRowButtonContainer: {
    flex: 1,
  },
  secondRowButtonContainerLeft: {
    alignItems: 'flex-end',
  },
  secondRowButtonContainerRight: {
    alignItems: 'flex-start',
  },
  navButton: {
    maxHeight: 39.5,
    marginVertical: 6,
    backgroundColor: '#75a882',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWithMargin: {
    flex: 0.36,
  },
  buttonWithMarginRight: {
    marginRight: 5,
  },
  buttonWithMarginLeft: {
    marginLeft: 5,
  },
  learnButton: {
    width: 100,
  },
  buttonIcon: {
    marginRight: 0,
  },
  reminders: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  reminderBox: {
    maxHeight: 120,
    minHeight: 80,
    flex: 0.5,
    paddingTop: 8,
    paddingBottom: 4,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'crimson',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  reminderBoxRight: {
    marginLeft: 10,
  },
  dailyActions: {
    marginRight: 5,
    backgroundColor: theme.palette.accent,
  },
  dailyActionsFont: {
    fontFamily: 'AGaramondPro-Italic',
    lineHeight: 27,
  },
  weeklyTopics: {
    backgroundColor: theme.palette.other.weeklyTopic.background,
  },
  socialFeedContainer: {
    flex: 1,
    marginTop: 16,
  },
  socialFeedTitle: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialFeedActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  newPostButton: {
    justifyContent: 'center',
    flex: 0.45,
    height: 40,
    backgroundColor: '#75a882',
  },
  newPostIcon: {
    marginRight: 5,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  switch: {
    marginLeft: 5,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  postsContainer: {
    flex: 1,
    marginTop: 10,
  },
}));

export const useHeaderStyle = makeStyle((theme) => ({
  headerContainer: {
    flex: Platform.OS === 'android' ? 0.85 : 1.2,
    zIndex: 1,
    elevation: 3,
    overflow: 'visible',
    borderWidth: 0.1,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    ...(Platform.OS === 'android' ? { justifyContent: 'space-around', alignItems: 'flex-end' } : {}),
  },
  headerTextContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerTextSeeking: {
    marginTop: 3,
    marginLeft: 4,
    fontSize: 24,
    textAlignVertical: 'center',
    fontFamily: 'AGaramondPro-Italic',
    color: 'black',
  },
  headerTextS: {
    marginTop: 2,
    marginLeft: 4,
    fontSize: 24,
    fontFamily: 'SabonLTStd-Roman',
    color: 'black',
  },
  headerTextAfety: {
    marginTop: 6,
    fontSize: 18,
    fontFamily: 'SabonLTStd-Roman',
    color: 'black',
  },
  headerNotificationIcon: {
    position: 'relative',
  },
  headerBudge: {
    position: 'absolute',
    top: -12,
    right: -8,
    backgroundColor: theme.palette.other.avatar.red,
    zIndex: 1,
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBudgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
}));

export const useCardStyle = makeStyle({
  root: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    minHeight: 100,
  },
});
