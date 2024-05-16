import { Text as TextNative, TextProps as TextPropsNative } from 'react-native';
import React from 'react';
import { makeStyle } from '@hooks/themed-style.hook';

interface OtherProps {
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  size?: number;
  fontStyle?: 'normal' | 'italic';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  bold?: boolean;
  center?: boolean;
  italic?: boolean;
  lineHeight?: number;
}

const STYLE_KEY = {
  weight: 'fontWeight',
  size: 'fontSize',
  fontStyle: 'fontStyle',
  align: 'textAlign',
  lineHeight: 'lineHeight',
};

export declare type TextProps = TextPropsNative & OtherProps;

export const Text: React.FC<TextProps> = (props) => {
  const styles = useTextStyle();

  const mutableProps = { ...props };

  if (!props.weight && props.bold) {
    mutableProps.weight = 'bold';
  }

  if (!props.align && props.center) {
    mutableProps.align = 'center';
  }

  if (!props.fontStyle && props.italic) {
    mutableProps.fontStyle = 'italic';
  }

  const propsStyles = ['weight', 'size', 'fontStyle', 'align', 'lineHeight']
    // @ts-ignore
    .filter((k) => !!mutableProps[k])
    // @ts-ignore
    .reduce((acc, act) => ({ ...acc, [STYLE_KEY[act]]: mutableProps[act] }), {});

  const styledProps = {
    ...props,
    style: [styles.root, propsStyles, props.style],
  };
  return <TextNative {...styledProps} />;
};

const useTextStyle = makeStyle((theme) => ({
  root: {
    color: theme.palette.text.primary,
    fontFamily: theme.fontFamily.primary,
  },
}));
