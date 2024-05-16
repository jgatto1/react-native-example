import React from 'react';
import { useArrowButtonStyles } from './ArrowButton.styles';
import { Text } from 'components';
import { Pressable, StyleProp, TextStyle, View, ViewStyle, Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { shadeRGB } from '@hooks/themed-style.hook';
import { useTheme } from 'providers/theme/ThemeProvider';

var width = Dimensions.get('window').width;

const shadowOpt = {
  width: width - 50,
  height: 59,
  color: '#000',
  border: 1,
  radius: 5,
  opacity: 0.06,
  x: 1,
  y: 3,
  style: { marginVertical: 5, zIndex: 2 },
};

interface ArrowButtonProps {
  // TODO: Add width and height
  text: string | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  textColor?: string;
  rootStyles?: StyleProp<ViewStyle>;
  tag?: boolean;
}

export const ArrowButton: React.VFC<ArrowButtonProps> = ({ text, tag, onClick, disabled, ...props }) => {
  const styles = useArrowButtonStyles();
  const theme = useTheme();

  const textColor: StyleProp<TextStyle> = !!props.textColor && { color: props.textColor };

  const backColor: StyleProp<ViewStyle> = !!props.color && { backgroundColor: props.color };
  const headBackColor: StyleProp<ViewStyle> = !!props.color && { borderBottomColor: props.color };

  const disabledBackColor = disabled && {
    backgroundColor: shadeRGB(props.color || theme.main.palette.other.dailyActions.button.background, 0.2),
  };

  const disabledHeadColor = disabled && {
    borderBottomColor: shadeRGB(props.color || theme.main.palette.other.dailyActions.button.background, 0.2),
  };

  const textWithTag = tag && {
    width: 'auto',
  };

  return (
    <View style={props.rootStyles}>
      <Pressable onPress={() => !disabled && onClick()}>
        <View style={styles.wrapper}>
          <BoxShadow setting={shadowOpt}>
            <View style={[styles.rectangle, backColor, disabledBackColor]}>
              <Text numberOfLines={1} style={[styles.text, textColor, textWithTag]}>
                {text}
              </Text>
              {tag && (
                <View style={styles.tagContainer}>
                  <Text size={15} style={textColor}>
                    {'New!'}
                  </Text>
                </View>
              )}
            </View>
          </BoxShadow>
          <View style={styles.triangleContainer}>
            <View style={[styles.triangle, headBackColor, disabledHeadColor]} />
            <View style={[styles.triangle, styles.triangleShadow]} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
