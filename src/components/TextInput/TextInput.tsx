import { Animated, Platform, StyleProp, TextInput as TextInputNative, TextInputProps, TextStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTextInputStyles } from './TextInput.styles';
import { useTheme } from 'providers/theme/ThemeProvider';

export const TextInput: React.VFC<TextInputProps & { readOnly?: boolean }> = (props) => {
  const styles = useTextInputStyles();

  const disabled = typeof props.editable === 'boolean' && !props.editable;

  const finalStyles = [
    Platform.OS === 'android' && !!props.multiline && ({ textAlignVertical: 'top' } as StyleProp<TextStyle>),
    styles.root,
    props.style,
    disabled && styles.disabled,
  ];

  const finalProps: TextInputProps = {
    ...props,
    editable: !props.readOnly || props.editable,
    style: finalStyles,
    onChange: !disabled ? props.onChange : undefined,
  };

  return <TextInputNative {...finalProps} />;
};

declare type AnimatedTextInputProps = TextInputProps & { error?: boolean; focusStyle?: StyleProp<TextStyle> };

export const AnimatedTextInput: React.VFC<AnimatedTextInputProps> = ({ error, ...props }) => {
  const [focus, isFocus] = useState(false);
  const styles = useTextInputStyles();
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animation = new Animated.Value(0);

  useEffect(() => {
    if (!error) {
      return;
    }
    animation.setValue(0);
    Animated.timing(animation, {
      useNativeDriver: true,
      duration: 300,
      toValue: 3,
    }).start();
  }, [animation, error]);

  const interpolated = animation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -10, 0, 10, 0, -10, 0],
  });

  const animatedStyle = {
    transform: [{ translateX: interpolated }],
  };

  const focusProps: Pick<TextInputProps, 'onFocus'> & Pick<TextInputProps, 'onBlur'> = {
    onFocus: (e) => {
      isFocus(true);
      props.onFocus && props.onFocus(e);
    },
    onBlur: (e) => {
      isFocus(false);
      props.onBlur && props.onBlur(e);
    },
  };

  return (
    <Animated.View style={animatedStyle}>
      <TextInput
        placeholderTextColor={theme.main.palette.other.login.placeholder}
        {...props}
        {...focusProps}
        style={[{ color: 'black' }, props.style, error && styles.inputError, focus && props.focusStyle]}
      />
    </Animated.View>
  );
};
