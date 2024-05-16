import { makeStyle } from 'providers/hooks/themed-style.hook';
import { Platform } from 'react-native';

export const useCardStyle = makeStyle((theme) => ({
  root: {
    backgroundColor: '#FFF',
    padding: 12,
    paddingTop: 24,
    marginBottom: 10,
    minHeight: 100,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  name: {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  date: {
    fontWeight: '300',
    fontFamily: 'Montserrat-Italic',
    fontSize: 10,
    ...(Platform.OS === 'android' && { color: '#abadb0' }),
  },
  about: {
    fontSize: 11,
    fontFamily: 'Montserrat-Italic',
  },
  postOrigin: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  public: {
    fontWeight: 'bold',
    color: theme.palette.primary,
  },
  private: {
    fontWeight: 'bold',
    color: theme.palette.divider.accent,
  },
  postContent: {
    marginVertical: 16,
  },
  imgContainer: {
    alignItems: 'center',
    // transform: [{ rotate: '90deg' }],
    alignSelf: 'center',
    marginBottom: 10,
    maxHeight: 200,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postFooter: {
    flexDirection: 'row',
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerActionText: {
    fontSize: 10,
    marginLeft: 3,
  },
  commentsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  commentsAction: {
    marginLeft: 8,
  },
  commentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.other.weeklyTopic.background,
    paddingBottom: 12,
  },
  postFooterFavOnly: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.other.weeklyTopic.background,
    paddingBottom: 12,
  },
}));

export const useAvatarStyle = makeStyle({
  root: {
    flex: 1,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
