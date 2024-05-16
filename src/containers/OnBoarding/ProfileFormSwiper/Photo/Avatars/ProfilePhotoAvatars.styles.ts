import { makeStyle } from '@hooks/themed-style.hook';

export const useProfilePhotoAvatarsStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.alternative,
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
  },
  titleContainer: {
    position: 'relative',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
    zIndex: 5,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  avatarsContainer: {
    flex: 30,
  },
  avatarsScrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
