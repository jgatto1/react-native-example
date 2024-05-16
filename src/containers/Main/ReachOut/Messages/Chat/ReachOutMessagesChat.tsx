import { Divider, Text } from 'components';
import { useReachOutMessageContext } from 'containers/Main/ReachOut/Messages/ReachOutMessages.context';
import { ChatLayout } from 'containers/Main/ReachOut/layout/Chat/ChatLayout/ChatLayout';
import { EMOJIS } from 'containers/OnBoarding/ProfileFormSwiper/About/assets';
import { useNavigationHideTab } from 'providers/navigation/hide-tab.hook';
import React from 'react';
import { Image, View } from 'react-native';
import { useReachOutMessagesChatStyles } from './ReachOutMessagesChat.styles';

export const ReachOutMessagesChat: React.VFC = () => {
  useNavigationHideTab();
  const styles = useReachOutMessagesChatStyles();
  const { actualChat } = useReachOutMessageContext();

  const emotionalStatus = actualChat?.channel?.emotional;

  const Header = actualChat?.type === 'channel' && (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.header}>
        <View style={styles.userEmojiContainer}>
          {emotionalStatus !== undefined && <Image style={styles.emoji} source={EMOJIS[emotionalStatus + 1]} />}
        </View>
        <Text style={styles.headerText}>{actualChat?.title}</Text>
      </View>
      <Divider margin={0} style={{ borderWidth: 0.6 }} />
    </View>
  );

  return !actualChat?.type ? null : (
    <ChatLayout type={actualChat?.type} uuid={actualChat?.uuid} header={Header} users={actualChat?.users || {}} />
  );
};
