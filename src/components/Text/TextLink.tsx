import { Pressable, StyleProp, TextStyle } from 'react-native';
import React from 'react';
import { Text, TextProps } from 'components/Text/Text';
import { makeStyle } from '@hooks/themed-style.hook';

interface TextLinkProps {
  onPress: () => void;
  plain?: boolean;
}

export const TextLink: React.FC<TextProps & TextLinkProps> = ({ onPress, plain, ...textProps }) => {
  const styles = useStyles();

  const textStyles: StyleProp<TextStyle> = [styles.link, textProps.style];

  return (
    <Pressable onPress={onPress} style={[styles.container, plain && styles.noUnderline]}>
      <Text {...textProps} style={textStyles} />
    </Pressable>
  );
};

const useStyles = makeStyle((theme) => ({
  container: {
    borderBottomWidth: 1,
    paddingBottom: 1,
    borderBottomColor: theme.palette.text.title,
  },
  link: {
    fontWeight: '600',
    color: theme.palette.text.title,
  },
  noUnderline: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
}));
