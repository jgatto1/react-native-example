import { makeStyle } from '@hooks/themed-style.hook';

export const useReachOutMessagesChatStyles = makeStyle(() => ({
  root: {
    flex: 1,
    display: 'flex',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  userEmojiContainer: {
    position: 'absolute',
    left: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    width: 10,
    height: 10,
    padding: 12,
    marginHorizontal: 4,
  },
  headerText: {
    marginVertical: 15,
  },
}));
