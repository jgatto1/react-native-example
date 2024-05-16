import { ProfilePhoto } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import React, { useContext, useState } from 'react';

interface IProfileSettingsPhotoContext {
  photo?: ProfilePhoto;
  setPhoto: (photo: ProfilePhoto) => void;
}

const NOOP = () => null;

const Context = React.createContext<IProfileSettingsPhotoContext>({ setPhoto: NOOP });

export const useProfileSettingsPhotoContext = () => useContext(Context);

export const ProfileSettingsPhotoContextProvider: React.FC = ({ children }) => {
  const [photo, setPhoto] = useState<ProfilePhoto>();

  const value: IProfileSettingsPhotoContext = {
    photo,
    setPhoto: (newPhoto) => setPhoto(newPhoto),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
