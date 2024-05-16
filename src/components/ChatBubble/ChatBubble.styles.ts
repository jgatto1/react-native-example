import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useChatBubbleStyles = makeStyle((theme) => ({
  talkBubbleOuter: {
    backgroundColor: 'transparent',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    elevation: 5,
  },
  talkBubble: {
    backgroundColor: 'transparent',

    shadowColor: theme.palette.other.chat.bubble.out.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 100,
    shadowRadius: 0.5,

    elevation: 5,
  },
  talkBubbleInner: {
    shadowColor: theme.palette.other.chat.bubble.out.border,
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 100,
    shadowRadius: 0.5,

    elevation: 5,
  },
  talkBubbleInnerOne: {
    shadowColor: theme.palette.other.chat.bubble.out.border,
    shadowOffset: {
      width: -1,
      height: 0,
    },
    shadowOpacity: 100,
    shadowRadius: 0.5,

    elevation: 5,
  },
  talkBubbleInnerTwo: {
    shadowColor: theme.palette.other.chat.bubble.out.border,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 100,
    shadowRadius: 0.5,

    elevation: 5,
  },
  talkBubbleSquare: {
    backgroundColor: theme.palette.other.chat.bubble.out.background,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    minWidth: '70%',
    maxWidth: Dimensions.get('window').width * 0.7,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    top: -5,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 10,
    borderRightWidth: 20,
    borderRightColor: theme.palette.other.chat.bubble.out.background,
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
  },
  talkBubbleTriangleRight: {
    transform: [{ rotate: '100deg' }],
    right: 6,
  },
  talkBubbleTriangleLeft: {
    left: 6,
    transform: [{ rotate: '80deg' }],
  },
}));
