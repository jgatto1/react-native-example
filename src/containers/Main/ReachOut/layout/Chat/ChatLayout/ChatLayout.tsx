import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import React, { createRef, useState } from 'react';
import { useChatLayoutStyles } from './ChatLayout.styles';
import { Button, Text, TextInput } from 'components';
import { useNavigationHideTab } from 'providers/navigation/hide-tab.hook';
import { ChatType, useChatMessages } from 'containers/Main/ReachOut/layout/Chat/ChatMessages.hook';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import { ChannelMessage, ChannelMessageCreate, ChannelMessageRes } from 'model/backend/channel';
import { BackendClient } from 'service/backend-client.service';
import { validateResponse } from 'model/backend';
import { ChatMessage } from 'containers/Main/ReachOut/layout/Chat/ChatMessage/ChatMessage';
import LinearGradient from 'react-native-linear-gradient';
import { Space } from 'components/Space/Space';
import { User } from 'model/backend/login';
import { useTheme } from 'providers/theme/ThemeProvider';

interface ChatLayoutProps {
  type: ChatType;
  uuid?: string;
  header?: React.ReactNode;
  users: { [key: string]: User };
}

export const ChatLayout: React.VFC<ChatLayoutProps> = ({ type, uuid, users, header }) => {
  useNavigationHideTab();

  const theme = useTheme();

  const styles = useChatLayoutStyles();

  const flatListRef = createRef<AutoScrollFlatList<ChannelMessage>>();

  const channel = useChatMessages(type, uuid);

  const [newMessage, setNewMessage] = useState<string>();

  const sendMessage = () => {
    if (!uuid || !newMessage) {
      return;
    }
    const data: ChannelMessageCreate = { message: newMessage };
    setNewMessage(undefined);
    BackendClient.post<ChannelMessageRes>(`/${type}/${uuid}/message/create`, data)
      .then(validateResponse)
      .catch((err) => {
        console.warn(`Cannot send message to chat ${type} ${uuid}`, err);
        setNewMessage(data.message);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss} accessible={false}>
        <>
          {header && (
            <>
              {header}
              {/* <Divider margin={0} style={{borderWidth: 0.3}} /> */}
            </>
          )}
          {channel.loadingMessages && (
            <View style={[styles.messages, styles.messagesLoadingContainer]}>
              <Text>Loading conversation...</Text>
              <ActivityIndicator />
            </View>
          )}
          {!channel.loadingMessages && (
            <AutoScrollFlatList
              ref={flatListRef}
              style={[styles.messages, styles.messagesContainer]}
              data={channel.messages}
              threshold={50}
              filteredDataForNewItemCount={(data) => data.filter((m) => channel.isNew(m))}
              onScroll={({ nativeEvent }) =>
                !flatListRef.current?.isAutoScrolling() &&
                nativeEvent.contentOffset.y === 0 &&
                channel.fetchPreviousMessages()
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.uuid}
              renderItem={({ item }) => <ChatMessage message={item} user={users[item.user_uuid]} />}
            />
          )}
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -330}>
            <View>
              <LinearGradient
                colors={[
                  styles.backgroundStart.color,
                  styles.backgroundMiddle.color,
                  styles.backgroundMiddle.color,
                  styles.backgroundEnd.color,
                  styles.backgroundMiddle.color,
                  styles.backgroundMiddle.color,
                  styles.backgroundStart.color,
                ]}>
                <View style={styles.sendContainer}>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      value={newMessage}
                      onChangeText={(m) => setNewMessage(m)}
                      style={styles.messageInput}
                      multiline
                      placeholderTextColor={theme.main.palette.other.login.placeholder}
                      placeholder='Write something...'
                    />
                  </View>
                  <Space horizontal />
                  <Button style={styles.sendButton} onPress={() => sendMessage()}>
                    SEND
                  </Button>
                </View>
              </LinearGradient>
            </View>
          </KeyboardAvoidingView>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
