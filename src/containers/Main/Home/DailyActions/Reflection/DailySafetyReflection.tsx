import React from 'react';
import { NewPost } from 'components';
import { useCohortTopic } from '../../CohortTopic.context';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { BackendClient } from 'service/backend-client.service';
import { Res } from 'model/backend';

const SAFETY_REFLECTION_TITLE = "Today's Safety Reflection";

export const DailySafetyReflection = () => {
  const { currentEvent } = useCohortTopic();
  const subtitle = (topicName: string): string =>
    `This week's topic is ${topicName}. How can you be more safe in relation to that?`;

  const onPostCreated = async (text: string) => {
    BackendClient.post<Res>('/safety_reflection/create', { text }).catch((err) =>
      console.warn('error while saving reflection status', err)
    );
  };

  return (
    <NewPost
      styleContainer={{ marginTop: 18 }}
      title={SAFETY_REFLECTION_TITLE}
      origin='Daily Safety Reflection'
      subtitle={subtitle(currentEvent.topic.name)}
      onSubmitNavigateRoute={DailyActionsRoutes.MENU}
      onPostCreated={(data) => onPostCreated(data.resource_data)}
    />
  );
};
