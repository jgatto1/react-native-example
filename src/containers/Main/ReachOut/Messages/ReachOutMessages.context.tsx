import React, { useContext, useEffect, useState } from 'react';
import { User } from 'model/backend/login';
import { F, Res, validateResponse } from 'model/backend';
import { useSession } from 'providers/session/SessionProvider';
import { HelpCope, HelpCopesRes, HelpCopeWithUser } from 'model/backend/help-cope';
import { BackendClient } from 'service/backend-client.service';
import { UserSettings } from 'model/backend/user.settings';
import { ReachOutMessagesRoutes } from 'containers/Main/ReachOut/Messages/ReachOutMessages.routes';
import { useNavigation } from '@react-navigation/native';
import { Channel, ChannelCreate, ChannelRes, ChannelsRes, GroupChatsRes } from 'model/backend/channel';
import { ChatType } from 'containers/Main/ReachOut/layout/Chat/ChatMessages.hook';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';
import { HomeRoutes } from 'containers/Main/Home/Home.stack.routes';

interface Loading {
  loading?: boolean;
}

interface IReachOutMessageContextUsers extends Loading {
  users: User[];
}

interface IReachOutMessageContextHelpCopes extends Loading {
  helpCopes: HelpCopeWithUser[];
}

interface IReachOutMessageContextChat {
  type: ChatType;
  users: { [uuid: string]: User };
  title: string;
  channel?: { emotional: number };
  uuid?: string;
}

const NO_CHAT: IReachOutMessageContextChat = {
  title: '',
  type: 'channel',
  users: {},
};

interface IReachOutMessageContext {
  available: boolean;
  switchAvailable: () => void;
  cohortUsers: IReachOutMessageContextUsers;
  helpCopes: IReachOutMessageContextHelpCopes;
  unreadHelpCopes: number;
  markHelpCopeAsRead: (helpCopeId: string | number) => void;
  openChatWithUser: (user: User, params?: object) => Promise<string | undefined>;
  openCohortChat: (params?: object) => void;
  actualChat?: IReachOutMessageContextChat;
}

const Context = React.createContext<IReachOutMessageContext>({} as IReachOutMessageContext);

export const useReachOutMessageContext = () => useContext(Context);

async function fillHelpCopesWithUser(helpCopes: HelpCope[]): Promise<HelpCopeWithUser[]> {
  const helpCopesPromises = helpCopes.map((helpCope) => {
    return BackendClient.get<Res<F<'user', User>>>(`/user/${helpCope.user_uuid}`)
      .then(validateResponse)
      .then((res) => {
        return { ...helpCope, user: res.user };
      })
      .catch((err) => {
        console.warn(`Error while trying to fill user ${helpCope.user_uuid} on help cope ${helpCope.id}`, err);
        return helpCope;
      });
  });
  return await Promise.all(helpCopesPromises);
}

export const ReachOutMessageProvider: React.FC = ({ children }) => {
  const session = useSession();
  const navigation = useNavigation();

  const [users, setUsers] = useState<IReachOutMessageContextUsers>({ loading: true, users: [] });
  const [helpCopes, setHelpCopes] = useState<IReachOutMessageContextHelpCopes>({ loading: true, helpCopes: [] });
  const [actualChat, setActualChat] = useState<IReachOutMessageContextChat>(NO_CHAT);

  useEffect(() => {
    const cohort_id = session.data?.user.cohort.id;
    const userUUID = session.userUUID;
    if (!cohort_id || !userUUID) {
      console.warn('ReachOutMessageContext not load due missing session data (cohort & user uuid)');
      return;
    }
    BackendClient.get<Res<F<'users', User[]>>>('/users', { params: { cohort_id } })
      .then(validateResponse)
      .then((res) => setUsers({ users: res.users.filter((user) => user.uuid !== session.userUUID) }))
      .catch((err) => {
        console.warn(`Cannot load users for cohort ${cohort_id}`, err);
      });
    BackendClient.get<HelpCopesRes>('/help_copes', { params: { cohort_id } })
      .then(validateResponse)
      .then((res) => fillHelpCopesWithUser(res.help_copes))
      .then((helpCopesWithUser) => setHelpCopes({ helpCopes: helpCopesWithUser }))
      .catch((err) => {
        console.warn(`Cannot load help copes for cohort ${cohort_id}`, err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markHelpCopeAsRead = (id: string | number) => {
    BackendClient.put(`/help_cope/${id}/mark_as_read`)
      .then(validateResponse)
      .then(() => {
        const updatedHelpCopes = helpCopes.helpCopes.map((helpCope) => {
          return helpCope.id === id ? { ...helpCope, is_read_by_me: true } : { ...helpCope };
        });
        setHelpCopes({ helpCopes: updatedHelpCopes });
      })
      .catch((err) => {
        console.warn(`Cannot mark as read help cope with id ${id}`, err);
      });
  };

  const available = !!session.data?.user.settings.available_to_chat;

  const switchAvailableToChat = () => {
    const userId = session.userUUID;
    if (!userId) {
      return;
    }
    const data: Partial<UserSettings> = { available_to_chat: !available };
    BackendClient.put<Res<F<'user', User>>>(`/user/${userId}/settings`, data)
      .then(validateResponse)
      .then((res) => session.updateUserData(res.user));
  };

  const fetchChannelForUser = async (user: User): Promise<Channel> => {
    const sessionUserUUID = session.userUUID;
    if (!sessionUserUUID) {
      throw new Error(`No user in session to fetch channel with another user ${user.uuid}`);
    }
    const existing = await BackendClient.get<ChannelsRes>('/channels', { params: { user_uuid: user.uuid } })
      .then(validateResponse)
      .then((res) => res.channels && res.channels.length > 0 && res.channels[0]);
    if (existing) {
      return existing;
    }
    const channelData: ChannelCreate = {
      display_name: `${user.uuid} : ${sessionUserUUID}`,
      user_uuids: [user.uuid, sessionUserUUID],
    };
    return await BackendClient.post<ChannelRes>('/channel/create', channelData)
      .then(validateResponse)
      .then((res) => res.channel);
  };

  const openChatWithUser = (user: User, params?: object): Promise<string | undefined> => {
    setActualChat({
      channel: { emotional: user.settings.emotional_status },
      title: user.settings.display_name,
      type: 'channel',
      users: { [user.uuid]: user },
    });
    navigation.navigate(ReachOutRoutes.MESSAGES, {
      screen: ReachOutMessagesRoutes.CHAT,
      params: {
        ...params,
        // @ts-ignore
        backRoute: params?.preventAgain ? HomeRoutes.NOTIFICATIONS : ReachOutMessagesRoutes.MAIN,
        // backStack: params?.preventAgain ? null : MainTabRoutes.REACH_OUT,
      },
    });
    return fetchChannelForUser(user)
      .then((channel) => {
        setActualChat((c) => ({ ...c, uuid: channel.uuid }));
        return channel.uuid;
      })
      .catch((err) => {
        console.warn(`Cannot fetch channel with user ${user.uuid}`, err);
        return undefined;
      });
  };

  const openCohortChat = (params?: object) => {
    const cohort_id = session.data?.user.cohort.id;
    if (!cohort_id) {
      return;
    }
    setActualChat({
      users: users.users.reduce((acc, act) => ({ ...acc, [act.uuid]: act }), {}),
      type: 'group_chat',
      title: '',
    });
    navigation.navigate(ReachOutRoutes.MESSAGES, {
      screen: ReachOutMessagesRoutes.CHAT,
      params: {
        // @ts-ignore
        backRoute: params?.preventAgain ? HomeRoutes.NOTIFICATIONS : ReachOutMessagesRoutes.MAIN,
      },
    });
    BackendClient.get<GroupChatsRes>('/group_chats', { params: { cohort_id } })
      .then(validateResponse)
      .then((res) => {
        if (res.group_chats.length < 1) {
          throw new Error('No group chat on response');
        }
        const groupChat = res.group_chats[0];
        setActualChat((c) => ({ ...c, uuid: groupChat.uuid, title: groupChat.name }));
      })
      .catch((err) => {
        console.warn(`Cannot open cohort chat ${cohort_id}`, err);
      });
  };

  const value: IReachOutMessageContext = {
    available,
    switchAvailable: () => switchAvailableToChat(),
    cohortUsers: users,
    helpCopes,
    markHelpCopeAsRead,
    unreadHelpCopes: helpCopes.helpCopes.filter((cope) => !cope.is_read_by_me).length,
    openChatWithUser,
    openCohortChat,
    actualChat,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
