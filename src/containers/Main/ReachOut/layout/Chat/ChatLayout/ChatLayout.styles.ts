import { makeStyle } from '@hooks/themed-style.hook';

export const useChatLayoutStyles = makeStyle(() => ({
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
  messages: {
    flexGrow: 1,
  },
  messagesLoadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '100%',
  },
  textInputContainer: {
    flexGrow: 1,
    flexBasis: 0,
  },
  messageInput: {
    maxWidth: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    maxHeight: 150,
    fontSize: 13,
    minHeight: 80,
  },
  sendButton: {
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  backgroundStart: {
    color: 'rgba(0,0,0,0.0)',
  },
  backgroundMiddle: {
    color: 'rgba(0,0,0,0.03)',
  },
  backgroundEnd: {
    color: 'rgba(0,0,0,0.1)',
  },
}));
