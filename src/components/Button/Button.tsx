import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Text } from 'components';
import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';
import { useTheme } from 'providers/theme/ThemeProvider';

interface ButtonProps extends Partial<PressableProps> {
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  disabled?: boolean;
  icon?: SVGElement;
  iconPosition?: 'start' | 'end';
  textStyle?: StyleProp<TextStyle>;
  noShadow?: boolean;
  horizontalButtonPadding?: number;
  loading?: boolean;
  light?: boolean;
}

const useButtonStyle = makeStyle((theme) => ({
  button: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    backgroundColor: alphaRGB(theme.palette.primary, 0.4),
  },
  shadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
  },
  withIcon: {
    flexDirection: 'row',
    paddingLeft: 4,
    paddingRight: 8,
  },
  text: {
    color: theme.palette.text.accent,
    fontWeight: 'bold',
  },
  textLight: {
    color: theme.palette.text.primary,
  },
  disabled: {
    backgroundColor: theme.palette.border.primary,
  },
}));

const useIconButtonStyle = makeStyle(() => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const Button: React.FC<ButtonProps> = (props) => {
  const styles = useButtonStyle();
  const propStyle = props.style && (props.style as StyleProp<ViewStyle>);
  const disabledStyle = (props.disabled || props.loading) && styles.disabled;
  const withIconStyle = props.icon && styles.withIcon;
  const theme = useTheme();

  const classnames = [
    styles.button,
    props.light && styles.light,
    !props.noShadow && styles.shadow,
    !!props.horizontalButtonPadding && { paddingHorizontal: props.horizontalButtonPadding },
    propStyle,
    disabledStyle,
    withIconStyle,
  ];

  if (props.loading) {
    return (
      <Pressable disabled={true} style={classnames} onPress={() => null}>
        <ActivityIndicator color={theme.main.palette.text.accent} />
      </Pressable>
    );
  }

  return (
    <Pressable disabled={props.disabled} style={classnames} onPress={props.onPress}>
      {(!props.iconPosition || props.iconPosition === 'start') && props.icon}
      <Text style={[styles.text, props.textStyle, props.light && styles.textLight]}>{props.children}</Text>
      {props.iconPosition === 'end' && props.icon}
    </Pressable>
  );
};

export const IconButton: React.FC<ButtonProps> = (props) => {
  const styles = useIconButtonStyle();
  const propsStyle = props.style && (props.style as StyleProp<ViewStyle>);

  return (
    <Pressable disabled={props.disabled} style={[styles.button, propsStyle]} onPress={props.onPress}>
      {props.children}
    </Pressable>
  );
};
