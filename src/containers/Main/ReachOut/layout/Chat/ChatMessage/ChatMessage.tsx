import { ActivityIndicator, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useChatMessageStyles } from './ChatMessage.styles';
import { Text } from 'components';
import { ChannelMessage } from 'model/backend/channel';
import { Space } from 'components/Space/Space';
import { ChatBubble } from 'components/ChatBubble/ChatBubble';
import moment from 'moment';
import { SVG } from 'containers/Main/ReachOut/layout/Chat/ChatMessage/assets';
import { BackendClient } from 'service/backend-client.service';
import { useSession } from 'providers/session/SessionProvider';
import { F, Res, validateResponse } from 'model/backend';
import { User } from 'model/backend/login';
import { StyledText } from 'components/Text/Styled/StyledText';

interface ChatMessageProps {
  message: ChannelMessage;
  user?: User;
}

const FALLBACK_USERS: { [uuid: string]: Promise<User | undefined> } = {};

const resolveUser = (uuid: string) => {
  if (FALLBACK_USERS[uuid]) {
    return FALLBACK_USERS[uuid];
  }
  FALLBACK_USERS[uuid] = BackendClient.get<Res<F<'user', User>>>(`/user/${uuid}`)
    .then(validateResponse)
    .then((res) => res.user)
    .catch((err) => {
      console.warn('Cannot fetch fallback user for chat', err);
      return undefined;
    });

  return FALLBACK_USERS[uuid];
};

export const ChatMessage: React.VFC<ChatMessageProps> = ({ message, user }) => {
  const styles = useChatMessageStyles();
  const session = useSession();
  const [flagged, setFlagged] = useState(message.is_flagged);
  const [flagging, setFlagging] = useState<boolean>(false);
  const [resolvedUser, setResolvedUser] = useState(user);

  const mine = session.userUUID === message.user_uuid;

  useEffect(() => {
    if (user) {
      return;
    }
    resolveUser(message.user_uuid).then((u) => setResolvedUser(u));
  }, [message, user]);

  const toggleFlag = () => {
    if (flagging) {
      return;
    }
    const action = flagged ? 'unflag' : 'flag';
    setFlagging(true);
    BackendClient.put(`/channel/message/${message.uuid}/${action}`)
      .then(validateResponse)
      .then(() => setFlagged((f) => !f))
      .catch((err) => {
        console.warn(`Cannot toggle message ${message.uuid} flag`, err);
      })
      .finally(() => {
        setFlagging(false);
      });
  };

  return (
    <View style={!mine ? styles.messageContainerOther : styles.messageContainer}>
      <Text bold>{mine ? 'You' : resolvedUser?.settings.display_name || 'User'}</Text>
      <Space />
      <View style={[styles.bubbleContainer, mine && styles.bubbleContainerLeft]}>
        <ChatBubble left={!mine}>
          <Text size={13} italic style={!mine && styles.messageDateRight}>
            {moment(message.modified).format('MM/DD/YYYY hh:mm A')}
          </Text>
          <StyledText text={message.message} />
        </ChatBubble>
        {!mine && (
          <>
            <Space horizontal />
            <View>
              <Pressable onPress={() => toggleFlag()}>
                {flagging && <ActivityIndicator color='grey' size='small' />}
                {!flagging && (
                  <>
                    {flagged && <SVG.FlagFill fill={styles.messageFlagged.color} fillOpacity={0.5} />}
                    {!flagged && <SVG.FlagEmpty fillOpacity={0.5} />}
                  </>
                )}
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
