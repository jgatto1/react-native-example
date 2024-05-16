import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { ReachOutSocialFeedRoutes } from './ReachOutSocialFeed.routes';
import { NewPost } from 'components';
import { ReachOutSocialFeed } from './ReachOutSocialFeed';

const Stack = createStackNavigator();

export const ReachOutSocialFeedStack: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator initialRouteName={ReachOutSocialFeedRoutes.MAIN}>
      <Stack.Screen options={optionsFor('Main')} name={ReachOutSocialFeedRoutes.MAIN} component={ReachOutSocialFeed} />
      <Stack.Screen
        options={optionsFor('New Social Feed Post')}
        name={ReachOutSocialFeedRoutes.NEW_POST}
        component={ReachOutSocialFeedNewPost}
      />
    </Stack.Navigator>
  );
};

const ReachOutSocialFeedNewPost = () => {
  return <NewPost title={'New Post'} onSubmitNavigateRoute={ReachOutSocialFeedRoutes.MAIN} />;
};
