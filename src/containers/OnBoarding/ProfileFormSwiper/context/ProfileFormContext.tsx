import { ProfileForm, ProfileFormData } from './model';
import React, { useContext, useState } from 'react';

const NOOP = () => console.warn('No context provider defined to use ProfileFormContext');

const ProfileFormContext = React.createContext<ProfileForm>({
  setInfo: NOOP,
  setPhoto: NOOP,
  setGroups: NOOP,
  switchGroupsPublic: NOOP,
  setAbout: NOOP,
});

export const useProfileForm = () => useContext(ProfileFormContext);

export const ProfileFormProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ProfileFormData>({});

  const setOf = (key: keyof ProfileFormData) => (value: any) => setData({ ...data, [key]: value });

  const value: ProfileForm = {
    ...data,
    setPhoto: setOf('photo'),
    setInfo: setOf('info'),
    setGroups: setOf('groups'),
    switchGroupsPublic: () => setOf('groupsPublic')(!data.groupsPublic),
    setAbout: setOf('aboutMe'),
  };

  return <ProfileFormContext.Provider value={value}>{children}</ProfileFormContext.Provider>;
};
