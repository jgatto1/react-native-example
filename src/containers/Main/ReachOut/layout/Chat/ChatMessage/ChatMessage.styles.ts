import { makeStyle } from '@hooks/themed-style.hook';

export const useChatMessageStyles = makeStyle((theme) => ({
  messageContainer: {
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  messageContainerOther: {
    marginVertical: 5,
    alignItems: 'flex-start',
  },
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleContainerLeft: {
    flexDirection: 'row-reverse',
  },
  messageDateRight: {
    alignSelf: 'flex-end',
  },
  messageFlagged: {
    color: theme.palette.error.primary,
  },
}));
