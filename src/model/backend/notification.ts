export interface INotification {
  id: number;
  is_read: boolean;
  metadata: NotificationMetadata;
  origin: string;
  text: string;
  user_uuid: string;
}

interface NotificationMetadata {
  from_user_uuid: string;
}
