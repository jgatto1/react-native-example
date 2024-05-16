import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import useStyles from './Loading.styles';

const Loading = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#FFFFFF' />
    </View>
  );
};

export default Loading;
