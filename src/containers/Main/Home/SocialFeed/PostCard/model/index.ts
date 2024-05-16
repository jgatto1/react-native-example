import { ImageURISource } from 'react-native';

export interface PostCardProps {
  id: string;
  name: string;
  shortBio?: string;
  date: string;
  postOrigin?: string;
  avatarImgUrl?: ImageURISource;
  image?: ImageURISource; // or maybe only supports one
  postTextContent: string;
  favorite?: boolean;
  flagged: boolean;
  commentCount?: number; // is it possible to add images in comments?
  commentSection?: boolean;
  isMainPost?: boolean;
  user: string;
  link?: string;
  isPublic?: boolean;
}
