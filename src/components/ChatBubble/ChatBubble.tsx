import { StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { useChatBubbleStyles } from './ChatBubble.styles';
import { useTheme } from 'providers/theme/ThemeProvider';

interface ChatBubbleProps {
  left?: boolean | string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ children, ...props }) => {
  const styles = useChatBubbleStyles();
  const inStyles = useChatBubbleInStyles(props.left);

  return (
    <View style={styles.talkBubbleOuter}>
      <View style={[styles.talkBubble, inStyles.shadow]}>
        <View style={[styles.talkBubbleInner, inStyles.shadow]}>
          <View style={[styles.talkBubbleInnerOne, inStyles.shadow]}>
            <View style={[styles.talkBubbleInnerTwo, inStyles.shadow]}>
              <View style={[styles.talkBubbleSquare, inStyles.background]}>{children}</View>
              <View
                style={[
                  styles.talkBubbleTriangle,
                  inStyles.border,
                  props.left ? styles.talkBubbleTriangleLeft : styles.talkBubbleTriangleRight,
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

interface ChatBubbleStyles {
  shadow: StyleProp<ViewStyle>;
  background: StyleProp<ViewStyle>;
  border: StyleProp<ViewStyle>;
}

const useChatBubbleInStyles = (inbound?: string | boolean): ChatBubbleStyles => {
  if (!inbound) {
    return { shadow: false, background: false, border: false };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { background, border } = React.useMemo(() => {
    if (typeof inbound === 'boolean') {
      return theme.main.palette.other.chat.bubble.in[0];
    }
    const size = theme.main.palette.other.chat.bubble.in.length;
    return theme.main.palette.other.chat.bubble.in[posGenerator(inbound) % size];
  }, [theme, inbound]);

  return {
    shadow: {
      shadowColor: border,
    },
    background: {
      backgroundColor: background,
    },
    border: {
      borderRightColor: background,
    },
  };
};

function posGenerator(toHash: string) {
  if (toHash.length === 0) {
    return 0;
  }
  let hash = 0;
  for (let i = 0; i < toHash.length; i++) {
    const char = toHash.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + char;
    // eslint-disable-next-line no-bitwise
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
