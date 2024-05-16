import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { NewPost } from 'components';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export const SafetySafePlaceNewPost = () => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 70}>
        <NewPost title='Add a reflection' onSubmitNavigateRoute={SafetyRoutes.SAFE_PLACE} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
