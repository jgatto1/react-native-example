import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { LearnRoutes, routeFor } from './Learn.routes';
import { Learn } from 'containers/Main/Learn/Learn';
import { LearnProvider, useLearn } from 'containers/Main/Learn/Learn.context';
import { buildLearnPostFor } from 'containers/Main/Learn/Post/LearnPost';

const Stack = createStackNavigator();

const LearnStackInner: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();
  const learn = useLearn();

  const posts = learn.content.map((c) => c.posts).reduce((acc, act) => [...acc, ...act], []);

  return (
    <Stack.Navigator initialRouteName={LearnRoutes.MAIN}>
      <Stack.Screen options={optionsFor('Learn')} name={LearnRoutes.MAIN} component={Learn} />

      {posts.map((post, index) => (
        <Stack.Screen
          key={index}
          options={optionsFor('Learn')}
          name={routeFor(post)}
          component={buildLearnPostFor(post, learn.reflections[post.id])}
        />
      ))}
    </Stack.Navigator>
  );
};

export const LearnStack = () => {
  return (
    <LearnProvider>
      <LearnStackInner />
    </LearnProvider>
  );
};
