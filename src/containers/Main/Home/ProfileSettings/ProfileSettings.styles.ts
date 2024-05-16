import { makeStyle } from '@hooks/themed-style.hook';

export const useProfileSettingsStyles = makeStyle((theme) => ({
  root: {
    backgroundColor: theme.palette.background.principal,
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 12,
  },

  mainCard: {
    marginTop: 10,
    borderRadius: 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: theme.palette.background.alternative,
  },
  cardResume: {
    flex: 1,
    flexDirection: 'row',
  },
  cardActions: {
    flex: 1,
  },
  nameContainer: {
    marginLeft: 10,
    flexGrow: 1,
  },
  aboutMe: {
    marginTop: 5,
  },
  cardEditButtons: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBottom: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: theme.palette.other.profileSetting.logoutButton.background,
  },
  emotionalEmojiContainer: {
    position: 'absolute',
    right: 0,
  },
  emotionalEmoji: {
    width: 25,
    height: 25,
  },
  informationContainer: {
    marginVertical: 10,
  },
  informationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationTitle: {
    marginLeft: 15,
  },
  informationInput: {
    borderWidth: 0,
    borderRadius: 2,
  },
  informationButton: {
    alignItems: 'center',
  },

  notificationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationContainer: {
    width: '100%',
    flexDirection: 'row',
  },

  notificationNameTitle: {
    marginHorizontal: 0,
  },

  notificationNameFlex: {
    justifyContent: 'center',
    flex: 9,
  },
  notificationEmailCheckFlex: {
    flex: 2,
    alignItems: 'center',
  },
  notificationPushCheckFlex: {
    flex: 4,
    alignItems: 'center',
  },
  notificationNameHeader: {
    fontSize: 12,
    marginHorizontal: 5,
    color: theme.palette.other.profileSetting.notifications.border,
    flexShrink: 1,
    maxWidth: '70%',
  },
  notificationCheck: {
    borderColor: theme.palette.accent,
    color: theme.palette.selected.primary,
    borderRadius: 0,
  },
  notificationUncheck: {
    borderRadius: 0,
    borderColor: theme.palette.primary,
  },
  notificationPushHeader: {
    textAlign: 'right',
  },
  notificationEmailHeader: {
    textAlign: 'center',
  },
  notificationHeader: {
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: theme.palette.other.profileSetting.notifications.border,
  },
  notification: {
    paddingVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: theme.palette.other.profileSetting.notifications.border,
  },
  notificationLastElem: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  radioLabelStyle: {
    marginLeft: 10,
  },
  divider: {
    borderColor: theme.palette.other.profileSetting.notifications.border,
  },
  bottomInformation: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  version: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  inputErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputErrorSVG: {
    color: theme.palette.darkRed.error,
  },
  inputErrorText: {
    color: theme.palette.darkRed.error,
    fontWeight: '500',
  },
}));
