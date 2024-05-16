import { Falsy, View } from 'react-native';
import { useBackgroundViewStyles } from 'components/BackgroundView/BackgroundView.styles';
import React from 'react';

export interface BackgroundViewProperties {
  styles?: BackgroundViewStyles;
}

export interface BackgroundViewStyles {
  top?: object;
  middle?: object | Falsy;
  bottom?: object;
}

export const BackgroundView: React.FC<BackgroundViewProperties> = ({ children, styles }) => {
  const baseStyles = useBackgroundViewStyles();

  return (
    <View style={baseStyles.root}>
      <View style={baseStyles.backgroundContainer}>
        <View style={[baseStyles.backgroundTop, styles?.top]} />
        <View style={[baseStyles.backgroundMiddle, styles?.middle]} />
        <View style={[baseStyles.backgroundBottom, styles?.bottom]} />
      </View>
      <View style={baseStyles.content}>{children}</View>
    </View>
  );
};
