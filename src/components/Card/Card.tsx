import { StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { useCardStyles } from './Card.styles';

interface CardProps {
  style?: StyleProp<ViewStyle>;
  plain?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  const styles = useCardStyles();

  return <View style={[styles.root, !props.plain && styles.shadow, props.style]}>{children}</View>;
};
