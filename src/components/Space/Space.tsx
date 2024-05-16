import { View } from 'react-native';
import React from 'react';

interface SpaceProps {
  horizontal?: boolean;
  margin?: number;
}

export const Space: React.VFC<SpaceProps> = ({ horizontal, margin }) => {
  const key = horizontal ? 'marginHorizontal' : 'marginVertical';

  return <View style={{ [key]: margin || 5 }} />;
};
