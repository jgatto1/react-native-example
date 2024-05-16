import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useProfileFormPublicStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 10,
  },
  profileCardContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    flexGrow: 1,
    borderRadius: 4,
    backgroundColor: theme.palette.background.alternative,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    backgroundColor: '#d4e2d7',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    maxWidth: 80,
    maxHeight: 80,
    width: 80,
    height: 80,
    zIndex: 80,
  },
  nameHeader: {
    marginLeft: 20,
    justifyContent: 'center',
    flexDirection: 'column',
    width: '66%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  name: {
    fontWeight: '400',
    fontSize: 15,
  },
  excerptContainer: {
    flexDirection: 'row',
  },
  excerpt: {
    fontSize: 11,
    marginTop: 5,
    flexShrink: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollContent: {
    marginTop: 5,
    flex: 1,
    width: '100%',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notPublic: {
    fontWeight: '400',
    fontSize: 11,
  },
  noSelected: {
    color: alphaRGB(theme.palette.text.primary, 0.5),
    marginVertical: 10,
    fontSize: 12,
  },
  fullText: {
    color: alphaRGB(theme.palette.text.primary, 0.7),
    fontSize: 14,
  },
  editContainer: {
    alignItems: 'flex-end',
    paddingBottom: 10,
    width: '100%',
  },
  editText: {
    textDecorationLine: 'underline',
    color: theme.palette.other.onBoarding.button.flat,
  },
  chipContainer: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'scroll',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 200,
    marginHorizontal: 2,
    backgroundColor: theme.palette.other.weeklyTopic.background,
  },
}));
