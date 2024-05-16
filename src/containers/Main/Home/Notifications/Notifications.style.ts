import { makeStyle } from '@hooks/themed-style.hook';

export const useNotificationsStyle = makeStyle((theme) => ({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    marginBottom: 24,
  },
  buttonAccountSettings: {
    marginBottom: 24,
    width: '60%',
  },
  textButton: {
    color: theme.palette.text.accent,
    fontSize: 12,
  },
  containerCard: {
    width: '100%',
    paddingTop: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 24,
  },
  containeravatar: {
    marginRight: 8,
  },
  avatarRed: {
    color: theme.palette.divider.accent,
  },
  avatarRedCircle: {
    backgroundColor: theme.palette.other.avatar.redLight,
  },
  containerDescription: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  description: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  closeIcon: {
    marginTop: 0,
    marginLeft: 8,
  },
}));
