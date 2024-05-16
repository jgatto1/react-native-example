import { StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { useAvatarStyles } from './Avatar.styles';
import { SVG } from './assets';

interface AvatarProps {
  size?: number;
  backgroundColor?: StyleProp<ViewStyle>;
  color?: string;
}

const DEFAULT_SIZE = 20;

export const DefaultAvatar: React.VFC<AvatarProps> = ({ size, backgroundColor, color }) => {
  const styles = useAvatarStyles();

  const svgSize = (size || DEFAULT_SIZE) * 0.8;

  return (
    <View style={[backgroundColor ?? styles.circle, styles.defaultContainer]}>
      <SVG.Default height={svgSize} width={svgSize} fill={color ?? styles.svg.color} />
    </View>
  );
};
