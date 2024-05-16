import { SafeAreaView } from 'react-native';
import React from 'react';
import { useSafetySafePlaceStyles } from './SafetySafePlace.styles';
import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { PostListScreen } from 'components/PostListScreen/PostListScreen';

export const SafetySafePlace: React.VFC = () => {
  const styles = useSafetySafePlaceStyles();

  return (
    <SafeAreaView style={styles.root}>
      <PostListScreen newPostRoute={SafetyRoutes.NEW_POST} place='msp_posts' />
    </SafeAreaView>
  );
};
