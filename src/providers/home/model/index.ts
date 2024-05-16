import { PostCardProps } from 'containers/Main/Home/SocialFeed/PostCard/model';

export interface HomeData {
  posts: PostCardProps[];
  dailyActions: string;
  weeklyTopics: string;
}
