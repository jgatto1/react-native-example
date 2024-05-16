import React, { useEffect, useState } from 'react';
import { useReachOutSpecialInterestGroups } from 'containers/Main/ReachOut/SpecialInterestGroups/ReachOutSpecialInterestGroup.context';
import { BackendClient } from 'service/backend-client.service';
import { GroupChatsRes } from 'model/backend/channel';
import { validateResponse } from 'model/backend';
import { ChatLayout } from 'containers/Main/ReachOut/layout/Chat/ChatLayout/ChatLayout';

export const ReachOutSpecialInterestGroupsChat: React.VFC = () => {
  const context = useReachOutSpecialInterestGroups();

  const [uuid, setUuid] = useState<string>();

  useEffect(() => {
    const interest_group_id = context.actualGroup?.id;
    if (!interest_group_id) {
      return;
    }
    BackendClient.get<GroupChatsRes>('/group_chats', { params: { interest_group_id } })
      .then(validateResponse)
      .then((res) => {
        if (res.group_chats.length < 1) {
          throw new Error('No group chat on response');
        }
        const groupChat = res.group_chats[0];
        setUuid(groupChat.uuid);
      })
      .catch((err) => {
        console.warn(`Cannot fetch interest group chat ${interest_group_id} ${context.actualGroup?.name}`, err);
      });
  }, [context]);

  return <ChatLayout type='group_chat' uuid={uuid} users={{}} />;
};
