import { StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { useDividerStyles } from './Divider.styles';

interface DividerProps {
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
  margin?: number;
  width?: number;
}

export const Divider: React.VFC<DividerProps> = (props) => {
  const styles = useDividerStyles();

  const directionStyle = props.vertical ? styles.vertical : styles.horizontal;

  const marginStyle =
    props.margin !== undefined &&
    props.margin >= 0 &&
    (props.vertical ? { marginHorizontal: props.margin } : { marginVertical: props.margin });

  const widthStyle = !!props.width && props.width > 0 && { borderWidth: props.width };

  return <View style={[styles.root, directionStyle, marginStyle, props.style, widthStyle]} />;
};
