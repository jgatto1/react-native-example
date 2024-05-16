import { CommonResponse, F, Res, validateResponse } from 'model/backend';
import { INotification } from 'model/backend/notification';
import { BackendClient } from 'service/backend-client.service';
import { User } from 'model/backend/login';
import { Post } from 'model/backend/social.feed';

declare type NotificationsRes = Res<F<'notifications', INotification[]>>;

export interface Notification extends INotification {
  params?: object;
  user?: User;
}

class NotificationsServiceImpl {
  async getAllNotifications(): Promise<NotificationsRes> {
    return BackendClient.get<NotificationsRes>('/notifications').then(validateResponse);
  }

  async fillMoreData(notifications: INotification[]): Promise<Notification[]> {
    return notifications.length === 0 ? [] : await Promise.all(notifications.map((n) => this.fillNotificationData(n)));
  }

  async fillNotificationData(notification: INotification): Promise<Notification> {
    const user = notification.metadata.from_user_uuid
      ? await BackendClient.get<Res<F<'user', User>>>(`/user/${notification.metadata.from_user_uuid}`)
          .then(validateResponse)
          .then(({ user: u }) => u)
          .catch((err) => {
            console.log('Cannot fetch notification user', err);
            return undefined;
          })
      : undefined;
    return {
      ...notification,
      user,
      params: await this.resolveParams(notification, user),
    };
  }

  async resolveParams(notification: INotification, user?: User): Promise<object> {
    if (notification.origin === 'comment_on_social_feed_post') {
      const mainPost = await BackendClient.get<Res<F<'msp_post', Post>>>(
        // @ts-ignore
        `/msp_post/${notification.metadata.msp_post_id}`
      )
        .then(validateResponse)
        .then((res) => {
          return res.msp_post;
        })
        .catch((err) => {
          console.log('Cannot fetch notification comment_on_social_feed_post post', err);
          return undefined;
        });
      return mainPost ? { mainPost } : {};
    }
    if (notification.origin === 'direct_message_from_member' || notification.origin === 'direct_message_from_leader') {
      return user ? { openChatWithUser: user } : {};
    }
    // if (notification.origin === 'help_cope') {
    //   return { openHelpMeCope: true };
    // }
    return {};
  }

  async getNotifications(): Promise<CommonResponse<'notifications', INotification[]>> {
    return BackendClient.get<CommonResponse<'notifications', INotification[]>>('/notifications?is_read=false')
      .then(validateResponse)
      .catch((err) => {
        throw Error(err);
      });
  }

  deleteNotification(id: number): Promise<CommonResponse<'notification', INotification>> {
    return BackendClient.delete<CommonResponse<'notification', INotification>>(`/notification/${id}/delete`)
      .then(validateResponse)
      .catch((err) => {
        throw Error(err);
      });
  }

  markAsRead(id: number): Promise<CommonResponse<'notification', INotification>> {
    return BackendClient.put<CommonResponse<'notification', INotification>>(`/notification/${id}/mark_as_read`).then(
      validateResponse
    );
  }
}

export const NotificationsService = new NotificationsServiceImpl();
