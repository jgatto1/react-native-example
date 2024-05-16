import React, { useContext, useState } from 'react';
import { useSession } from 'providers/session/SessionProvider';
import { BackendClient } from 'service/backend-client.service';
import { InterestGroup, InterestGroupJoined, InterestGroupsRes } from 'model/backend/interest-group';
import { validateResponse } from 'model/backend';
import { useNavigation } from '@react-navigation/native';
import { ReachOutSpecialInterestGroupsRoutes } from 'containers/Main/ReachOut/SpecialInterestGroups/ReachOutSpecialInterestGroups.routes';

interface IReachOutSpecialInterestGroupsContext {
  loading?: boolean;
  groups: InterestGroupJoined[];
  setActualGroup: (group: InterestGroupJoined) => void;
  actualGroup?: InterestGroupJoined;
  joining?: boolean;
}

const Context = React.createContext<IReachOutSpecialInterestGroupsContext>({} as IReachOutSpecialInterestGroupsContext);

export const useReachOutSpecialInterestGroups = () => useContext(Context);

async function fillJoined(userUUID: string, groups: InterestGroup[]): Promise<InterestGroupJoined[]> {
  const joinedInterestGroups = await BackendClient.get<InterestGroupsRes>(`/user/${userUUID}/interest_groups`)
    .then(validateResponse)
    .then((res) => new Set(res.interest_groups.map((i) => i.id)))
    .catch((err) => {
      console.warn('Cannot fetch user interest group', err);
      return new Set();
    });
  return groups.map((group) => ({ ...group, joined: joinedInterestGroups.has(group.id) }));
}

export const ReachOutSpecialInterestGroupProvider: React.FC = ({ children }) => {
  const session = useSession();
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<InterestGroupJoined[]>([]);
  const [actualGroup, setActualGroup] = useState<InterestGroupJoined>();
  const [joining, setJoining] = useState(false);

  React.useEffect(() => {
    const userId = session.userUUID;
    if (!userId) {
      return;
    }
    BackendClient.get<InterestGroupsRes>('/interest_groups')
      .then(validateResponse)
      .then((res) => fillJoined(userId, res.interest_groups))
      .then((interestGroups) => setGroups(interestGroups))
      .catch((err) => {
        console.warn('Cannot fetch interest groups', err);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doSetGroup = (group: InterestGroupJoined) => {
    if (!group.joined) {
      setJoining(true);
      const interest_group_ids = [group.id];
      BackendClient.put(`/user/${session.userUUID}/interest_groups/add`, { interest_group_ids })
        .then(validateResponse)
        .then(() => {
          setGroups(groups.map((g) => ({ ...g, joined: g.id === group.id ? true : g.joined })));
        })
        .catch((err) => {
          console.warn(`Cannot join user ${session.userUUID} to interest group ${group.id} - ${group.name}`, err);
        })
        .finally(() => setJoining(false));
      return;
    }
    setActualGroup(group);
    navigation.navigate(ReachOutSpecialInterestGroupsRoutes.CHAT);
  };

  const value: IReachOutSpecialInterestGroupsContext = {
    loading,
    groups,
    actualGroup,
    joining,
    setActualGroup: (group) => doSetGroup(group),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
