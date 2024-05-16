import { useEffect, useState } from 'react';
import { ChannelMessage, ChannelMessagesRes, GroupChatMessagesRes } from 'model/backend/channel';
import { BackendClient } from 'service/backend-client.service';
import { validateResponse } from 'model/backend';
import moment from 'moment';

interface Message extends ChannelMessage {
  status?: 'SENDING' | 'SENT' | 'ERROR';
}

export declare type ChatType = 'group_chat' | 'channel';

declare type ChatMessagesRes = ChannelMessagesRes & GroupChatMessagesRes;

const unifyChatRes: (res: ChatMessagesRes) => ChannelMessagesRes = (res) => ({
  ...res,
  messages: res.messages || res.group_chat_messages,
});

const messageFilter = (m: ChannelMessage) => !!m.user_uuid && !m.is_hidden;

export const useChatMessages = (type: ChatType, uuid?: string) => {
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchingHistoryPage, setFetchingHistoryPage] = useState(false);
  const [historyPage, setHistoryPage] = useState<number>();
  const [firstMessage, setFirstMessage] = useState<ChannelMessage>();

  useEffect(() => {
    setLoadingMessages(true);
    if (!uuid) {
      return;
    }

    let interval: NodeJS.Timer | null = null;
    let messagesIds: Set<string> = new Set();
    let mounted = true;

    const pollMessages = () => {
      BackendClient.get<ChatMessagesRes>(`/${type}/${uuid}/messages`)
        .then(validateResponse)
        .then(unifyChatRes)
        .then((res) => {
          if (!mounted) {
            return;
          }
          const newMessages = res.messages.filter((m) => !messagesIds.has(m.uuid)).filter(messageFilter);
          setMessages((m) => [...m, ...newMessages]);
          newMessages.forEach((m) => messagesIds.add(m.uuid));
        })
        .catch((err) => {
          console.warn(`Cannot do polling for ${type} ${uuid}`, err);
        })
        .finally(() => {
          interval = setTimeout(pollMessages, 2000);
        });
    };
    BackendClient.get<ChatMessagesRes>(`/${type}/${uuid}/messages`)
      .then(validateResponse)
      .then(unifyChatRes)
      .then(async (res) => {
        const lastPageMessages = res.messages.filter(messageFilter);
        if (lastPageMessages.length === 0 && res.page === 1) {
          return;
        }
        if (lastPageMessages.length < 18 && res.page > 1) {
          const secondToLastPageMessages = await BackendClient.get<ChatMessagesRes>(`/${type}/${uuid}/messages`, {
            params: { page: res.page - 1 },
          })
            .then(validateResponse)
            .then(unifyChatRes)
            .then((secondRes) => secondRes.messages.filter(messageFilter))
            .catch((err) => {
              console.warn(`Cannot fetch second to last page for ${type} ${uuid}`, err);
              return [];
            });
          const firstMessages = [...secondToLastPageMessages, ...lastPageMessages];
          firstMessages.forEach((m) => messagesIds.add(m.uuid));
          setMessages(firstMessages);
          setFirstMessage(firstMessages[0]);
          setHistoryPage(res.page - 1);
        } else {
          lastPageMessages.forEach((m) => messagesIds.add(m.uuid));
          setMessages([...lastPageMessages]);
          setFirstMessage(lastPageMessages[0]);
          setHistoryPage(res.page);
        }
      })
      .catch((err) => {
        console.warn(`Cannot fetch messages of ${type} ${uuid}`, err);
      })
      .then(() => (interval = setTimeout(pollMessages, 2000)))
      .finally(() => {
        setLoadingMessages(false);
      });
    return () => {
      mounted = false;
      interval && clearTimeout(interval);
    };
  }, [type, uuid]);

  const fetchPreviousMessages = () => {
    if (fetchingHistoryPage || typeof historyPage !== 'number' || !uuid || loadingMessages) {
      return;
    }
    const pageToFetch = historyPage - 1;
    if (pageToFetch <= 0) {
      return;
    }
    setFetchingHistoryPage(true);
    BackendClient.get<ChatMessagesRes>(`/${type}/${uuid}/messages`, { params: { page: pageToFetch } })
      .then(validateResponse)
      .then(unifyChatRes)
      .then((res) => {
        setMessages((m) => [...res.messages.filter(messageFilter), ...m]);
        setHistoryPage(pageToFetch);
      })
      .catch((err) => {
        console.warn(`Cannot fetch history page ${pageToFetch} for ${type} ${uuid}`, err);
      })
      .finally(() => setFetchingHistoryPage(false));
  };

  const isNew = (data: ChannelMessage) => {
    if (!firstMessage) {
      return true;
    }
    return moment(data.created).isAfter(moment(firstMessage.created));
  };

  return {
    messages,
    loadingMessages,
    fetchPreviousMessages,
    isNew,
  };
};
