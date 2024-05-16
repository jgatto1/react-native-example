import { Comment, Post } from 'model/backend/social.feed';
import { PostCardProps } from './PostCard/model';
import moment from 'moment';
import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { Settings, User } from 'model/backend/login';
import { showAlertIfNetworkError } from 'providers/error.alert';

export type SocialFeedPlace = 'msp_posts' | 'social_feed';

// When there aren't more posts. The BE return 404
const VALID_POSTS_404 = (status: number) => (status >= 200 && status < 300) || status === 404;

const NO_MORE_RES = { msp_posts: [] };

class SocialFeedServiceImpl {
  getPosts = (
    place: SocialFeedPlace,
    offset: number,
    favoritesOnly = false,
    newestTop = true,
    cohortId?: number
  ): Promise<PostCardProps[]> => {
    const cohort = typeof cohortId === 'number' ? `&cohort_id=${cohortId}` : '';
    const url = `${place}?is_hidden=false&favs_only=${favoritesOnly}&order_by=created&reverse=${newestTop}&page=${offset}${cohort}`;
    return BackendClient.get<Res<{ msp_posts: Post[] }>>(url, { validateStatus: VALID_POSTS_404 })
      .then((res) => (res.status === 404 ? NO_MORE_RES : validateResponse(res)))
      .then((data) => this.transformPostsResponse(data.msp_posts)) // transform BE response to FE object
      .catch((err) => {
        console.error(err, url);
        return [];
      });
  };

  getComments = (postId: string, offset: number): Promise<PostCardProps[] | void> => {
    const url = `/msp_post/${postId}/comments?page=${offset}&is_hidden=false`;
    return BackendClient.get<Res<{ comments: Comment[] }>>(url)
      .then(validateResponse)
      .then((data) => this.transformCommentsResponse(data.comments))
      .catch((err) => console.warn(err, url));
  };

  getAvatarUrl = (avatar_uuid: string | null): Promise<string | void> => {
    return BackendClient.get<Res<{ url: string }>>(`/avatar/${avatar_uuid}/url?width=256&height=256`)
      .then(validateResponse)
      .then((data) => data.url)
      .catch((err) => console.warn(err, `/avatar/${avatar_uuid}/url?width=256&height=256`));
  };
  getPostImageUrl = (postId: string): Promise<string | void> => {
    return BackendClient.get<Res<{ url: string }>>(`msp_post/${postId}/image_url?width=256`)
      .then(validateResponse)
      .then((data) => data.url)
      .catch((err) => console.warn(err, `msp_post/${postId}/image_url?width=256`));
  };

  getUserInfo = (userId: string): Promise<Settings | void> => {
    return BackendClient.get<Res<{ user: User }>>(`/user/${userId}`)
      .then(validateResponse)
      .then((res) => res.user.settings)
      .catch((err) => console.warn(err, `/user/${userId}`));
  };

  toggleFavorite = (postId: string, fav: boolean) => {
    const url = fav ? `/msp_post/${postId}/favorite` : `/msp_post/${postId}/unfavorite`;
    return BackendClient.put(url)
      .then(validateResponse)
      .catch((err) => console.warn(err, url));
  };

  toggleFlag = (postId: string, flag: boolean) => {
    const url = flag ? `/msp_post/${postId}/flag` : `/msp_post/${postId}/unflag`;
    BackendClient.put(url)
      .then(validateResponse)
      .catch((err) => console.warn(err, url));
  };

  addComment = (postId: string, comment: string, userId?: string | null): Promise<PostCardProps | null> => {
    const url = `msp_post/${postId}/comment/create`;
    return BackendClient.post<Res<{ comment: Comment }>>(url, { comment })
      .then(validateResponse)
      .then((res) => this.transformCommentResponse(res.comment))
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn(`Error while trying to add a comment. url=${url}. comment=${comment}`, err);
        // TODO: This is a workaround to the bug in the backend
        if (err.response?.data?.error === "receive_email() got an unexpected keyword argument 'message_lines'") {
          return this.transformCommentResponse({
            comment,
            count_flags: 0,
            created: `${moment().format('ddd, DD MMM YYYY hh:mm:ss')} GMT`,
            id: 0,
            is_flagged: false,
            is_hidden: false,
            modified: `${moment().format('ddd, DD MMM YYYY hh:mm:ss')} GMT`,
            msp_post_id: parseInt(postId, 10),
            user_uuid: `${userId}`,
          });
        }
        return null;
      });
  };

  private transformPostsResponse = async (posts: Post[]): Promise<PostCardProps[]> => {
    return Promise.all(
      posts.map(async (post: Post): Promise<PostCardProps> => {
        const { about_me_short } = (await this.getUserInfo(post.user.uuid)) as Settings;
        const avatarUrl = post.user.avatar_url_512;
        const imageUrl = post.image_url_512 ? ((await this.getPostImageUrl(String(post.id))) as string) : null;
        return {
          id: String(post.id),
          name: post.user.display_name,
          shortBio: about_me_short,
          date: moment(Date.parse(post.created)).format('L h:mm A'),
          postTextContent: post.resource_data,
          postOrigin: post.origin,
          commentCount: post.comments_count,
          favorite: post.is_favorited,
          flagged: post.is_flagged,
          link: post.link || undefined,
          avatarImgUrl: avatarUrl ? { uri: avatarUrl } : undefined,
          image: imageUrl ? { uri: imageUrl } : undefined,
          user: String(post.user.uuid),
          isPublic: post.is_public,
        };
      })
    );
  };

  private transformCommentsResponse = (comments: Comment[]): Promise<PostCardProps[]> => {
    return Promise.all(comments.map((comment) => this.transformCommentResponse(comment)));
  };

  private transformCommentResponse = async (comment: Comment): Promise<PostCardProps> => {
    const { display_name, avatar_url_512 } = (await this.getUserInfo(comment.user_uuid)) as Settings;
    return {
      id: String(comment.id),
      name: display_name,
      date: moment(Date.parse(comment.created)).format('L h:mm A'),
      postTextContent: comment.comment,
      flagged: comment.is_flagged,
      avatarImgUrl: avatar_url_512 ? { uri: avatar_url_512 } : undefined,
      user: comment.user_uuid,
    };
  };
}

export const SocialFeedService = new SocialFeedServiceImpl();
