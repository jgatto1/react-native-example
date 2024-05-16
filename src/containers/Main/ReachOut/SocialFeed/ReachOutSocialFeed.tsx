import { SafeAreaView } from 'react-native';
import React from 'react';
import { useReachOutSocialFeedStyles } from './ReachOutSocialFeed.styles';
import { PostListScreen } from 'components/PostListScreen/PostListScreen';
import { ReachOutSocialFeedRoutes } from './ReachOutSocialFeed.routes';

export const ReachOutSocialFeed: React.VFC = () => {
  const styles = useReachOutSocialFeedStyles();

  return (
    <SafeAreaView style={styles.root}>
      <PostListScreen newPostRoute={ReachOutSocialFeedRoutes.NEW_POST} place='social_feed' onlyCohort />
    </SafeAreaView>
  );
};
