import { F, Res } from 'model/backend/index';
import { Cohort } from 'model/backend/login';
import { InterestGroup } from 'model/backend/interest-group';

export interface ChannelCreate {
  display_name: string;
  user_uuids: string[];
}

export interface Channel extends ChannelCreate {
  uuid: string;
}

export interface ChannelMessageCreate {
  message: string;
}

export interface ChannelMessage extends ChannelMessageCreate {
  channel_uuid: string;
  count_flags: number;
  created: string;
  is_flagged: boolean;
  is_hidden: boolean;
  modified: string;
  user_uuid: string;
  uuid: string;
}

export interface GroupChat {
  cohort: Cohort;
  interest_group: InterestGroup;
  name: string;
  uuid: string;
}

export declare type ChannelsRes = Res<F<'channels', Channel[]>>;
export declare type ChannelRes = Res<F<'channel', Channel>>;

export declare type ChannelMessagesRes = Res<F<'messages', ChannelMessage[]> & F<'page', number>>;
export declare type ChannelMessageRes = Res<F<'message', ChannelMessage>>;

export declare type GroupChatMessagesRes = Res<F<'group_chat_messages', ChannelMessage[]>>;
export declare type GroupChatMessageRes = Res<F<'group_chat_message', ChannelMessage[]>>;

export declare type GroupChatsRes = Res<F<'group_chats', GroupChat[]>>;
export declare type GroupChatRes = Res<F<'group_chat', GroupChat>>;
