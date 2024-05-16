import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { ReachOutMessagesRoutes } from './ReachOutMessages.routes';
import { ReachOutMessages } from 'containers/Main/ReachOut/Messages/ReachOutMessages';
import {
  ReachOutMessageProvider,
  useReachOutMessageContext,
} from 'containers/Main/ReachOut/Messages/ReachOutMessages.context';
import { ReachOutMessagesHelpMeCope } from 'containers/Main/ReachOut/Messages/HelpMeCope/ReachOutMessagesHelpMeCope';
import { ReachOutMessagesChat } from 'containers/Main/ReachOut/Messages/Chat/ReachOutMessagesChat';

const Stack = createStackNavigator();

export const ReachOutMessagesStack: React.VFC = () => {
  return (
    <ReachOutMessageProvider>
      <Navigator />
    </ReachOutMessageProvider>
  );
};

const Navigator: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();
  const messages = useReachOutMessageContext();

  return (
    <Stack.Navigator initialRouteName={ReachOutMessagesRoutes.MAIN}>
      <Stack.Screen
        options={optionsFor('Direct Messages')}
        name={ReachOutMessagesRoutes.MAIN}
        component={ReachOutMessages}
      />

      <Stack.Screen
        options={optionsFor('Help Me Cope')}
        name={ReachOutMessagesRoutes.HELP_ME_COPE}
        component={ReachOutMessagesHelpMeCope}
      />

      <Stack.Screen
        options={optionsFor(messages.actualChat?.title || 'Loading conversation...', {
          popupProps: { title: 'MORE INFORMATION', content: 'Share... connect... keep in touch' },
        })}
        name={ReachOutMessagesRoutes.CHAT}
        component={ReachOutMessagesChat}
      />
    </Stack.Navigator>
  );
};
