export interface SocialFeed {
  msp_posts: Post[];
  page: number;
}

export interface Post {
  resource_data: string;
  created: string; // have to format this
  id: number; // postID used to retrieve postImageUrl ??
  image_url_512: string | null;
  origin: string;
  is_favorited: boolean;
  is_flagged: boolean;
  is_public: boolean;
  comments_count: number;
  link: string | null;
  count_flags: number;
  is_deleted: boolean;
  is_hidden: boolean;
  modified: string;
  resource_id: null;
  resource_type: ResourceType;
  user: PostUser;
}

export interface PostUser {
  display_name: string; // ["user"]["display_name"]
  avatar_url_512: string | null; // ["user"]["avatar_url_512"]
  avatar_uuid: string | null; // ["user"]["avatar_uuid"]
  uuid: string; // ["user"]["uuid"]
  study_id: string;
}

export interface Comments {
  comments: Comment[];
}

export interface Comment {
  comment: string;
  count_flags: number;
  created: string;
  id: number;
  is_flagged: boolean;
  is_hidden: boolean;
  modified: string;
  msp_post_id: number;
  user_uuid: string;
}

export enum ResourceType {
  LeaderPost = 'leader_post',
  MemberPost = 'member_post',
}
