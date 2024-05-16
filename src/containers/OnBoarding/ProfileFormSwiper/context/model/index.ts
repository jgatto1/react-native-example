import { ImageSourcePropType } from 'react-native';

export interface ProfileInformation {
  firstName?: string;
  lastName?: string;
  publicName?: string;
}

export interface ProfileInterestGroup {
  id: number;
  name: string;
}

export interface ProfileFormAbout {
  excerpt?: string;
  fullText?: string;
  emotionalStatus?: number;
  public?: boolean;
}

export interface ProfilePhoto {
  source?: ImageSourcePropType;
  base64?: string;
  loading?: boolean;
}

export interface ProfileFormData {
  info?: ProfileInformation;
  photo?: ProfilePhoto;
  groups?: ProfileInterestGroup[];
  groupsPublic?: boolean;
  aboutMe?: ProfileFormAbout;
}

export interface ProfileForm extends ProfileFormData {
  setInfo: (info: ProfileInformation) => void;
  setPhoto: (photo: ProfilePhoto) => void;
  setGroups: (groups: ProfileInterestGroup[]) => void;
  setAbout: (about: ProfileFormAbout) => void;
  switchGroupsPublic: () => void;
}
