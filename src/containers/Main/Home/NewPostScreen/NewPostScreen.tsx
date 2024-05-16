import React from 'react';
import { ScrollView } from 'react-native';
import { NewPost } from 'components';
import { HomeRoutes } from '../Home.stack.routes';

const NEW_POST_SCREEN_TITLE = 'Add a reflection';

export const NewPostScreen = () => {
  return (
    <ScrollView>
      <NewPost origin='Main Menu' title={NEW_POST_SCREEN_TITLE} onSubmitNavigateRoute={HomeRoutes.HOME} />
    </ScrollView>
  );
};
