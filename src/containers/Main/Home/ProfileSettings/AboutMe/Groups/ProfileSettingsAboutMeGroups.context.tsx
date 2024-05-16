import { ProfileInterestGroup } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import React, { useContext, useEffect, useState } from 'react';
import { BackendClient } from 'service/backend-client.service';
import { F, Res, validateResponse } from 'model/backend';
import { useSession } from 'providers/session/SessionProvider';
import { User } from 'model/backend/login';

interface IProfileSettingsAboutMeGroupsContext {
  loading: boolean;
  initialGroups?: Set<number>;
  setInitialGroups: (groups: Set<number>) => void;
  groups?: ProfileInterestGroup[];
  setGroups: (groups: ProfileInterestGroup[]) => void;
  isPublic?: boolean;
  switchIsPublic: () => void;
}

const NOOP = () => null;
const Context = React.createContext<IProfileSettingsAboutMeGroupsContext>({
  loading: false,
  setGroups: NOOP,
  switchIsPublic: NOOP,
  setInitialGroups: NOOP,
});

export const useProfileSettingsAboutMeGroups = () => useContext(Context);

declare type UserInterestGroupsRes = Res<F<'user', User> & F<'interest_groups', ProfileInterestGroup[]>>;

export const ProfileSettingsAboutMeGroupsContextProvider: React.FC = ({ children }) => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<ProfileInterestGroup[]>();
  const [isPublic, setIsPublic] = useState<boolean>();
  const [loaded, setLoaded] = useState(false);
  const [initialGroups, setInitialGroups] = useState<Set<number>>();

  useEffect(() => {
    const userId = session.data?.user.uuid;
    if (!userId) {
      setLoading(false);
      return;
    }
    if (loaded) {
      return;
    }
    BackendClient.get<UserInterestGroupsRes>(`/user/${userId}/interest_groups`)
      .then(validateResponse)
      .then((data) => {
        setGroups(data.interest_groups);
        setInitialGroups(new Set(data.interest_groups.map((g) => g.id)));
        setIsPublic(!data.user.settings.hide_about_me);
        setLoaded(true);
      })
      .catch((err) => console.warn('Cannot fetch user interest groups', err))
      .finally(() => setLoading(false));
  }, [session, loaded]);

  const value: IProfileSettingsAboutMeGroupsContext = {
    groups,
    loading,
    isPublic,
    initialGroups,
    setInitialGroups: (newInitials) => setInitialGroups(newInitials),
    switchIsPublic: () => setIsPublic(!isPublic),
    setGroups: (newGroups: ProfileInterestGroup[]) => setGroups(newGroups),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
