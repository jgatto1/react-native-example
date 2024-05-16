export interface Login {
  access_token: string;
  refresh_token?: string; // Not returned if it's already logged in (send cookie)
  error: string;
  status: string;
  user: User;
}

export interface User {
  cell_phone: string | null;
  cohort: Cohort;
  created: string;
  email: string;
  first_name: string | null;
  home_phone: string | null;
  is_active: boolean;
  last_login: LastLogin;
  last_name: string | null;
  modified: string;
  roles: string[];
  settings: Settings;
  study_id: string;
  study_initials: string;
  uuid: string;
}

export interface Cohort {
  enabled_features: string[] | null;
  id: number;
  is_deleted: boolean;
  name: string;
}

export interface LastLogin {
  app_version: string | null;
  created: string;
  modified: string;
}

export interface Settings {
  about_me_long: string;
  about_me_short: string;
  available_to_chat: boolean;
  avatar_url_512: string | null;
  avatar_uuid: string | null;
  display_name: string;
  emotional_status: number;
  hide_about_me: boolean;
  hide_interest_groups: boolean;
  id: number;
  is_onboarded: boolean;
  notification_settings: NotificationSettings;
  progress_report_days: number;
  share_with_all: boolean;
  show_social_feed: boolean;
}

export interface NotificationSettings {
  boomerang_message_email: boolean;
  boomerang_message_notification: boolean;
  comment_on_social_feed_post_email: boolean;
  comment_on_social_feed_post_notification: boolean;
  direct_message_from_leader_email: boolean;
  direct_message_from_leader_notification: boolean;
  direct_message_from_member_email: boolean;
  direct_message_from_member_notification: boolean;
  help_cope_email: boolean;
  help_cope_notification: boolean;
  meeting_reminder_email: boolean;
  meeting_reminder_notification: boolean;
  new_daily_quiz_email: boolean;
  new_daily_quiz_notification: boolean;
  new_daily_share_email: boolean;
  new_daily_share_notification: boolean;
  new_social_feed_post_cohort_email: boolean;
  new_social_feed_post_cohort_notification: boolean;
  new_social_feed_post_community_email: boolean;
  new_social_feed_post_community_notification: boolean;
  new_weekly_topic_email: boolean;
  new_weekly_topic_notification: boolean;
  safety_check_in_reminder_days: number;
  safety_check_in_reminder_email: boolean;
  safety_check_in_reminder_notification: boolean;
  setting_id: number;
  talk_to_safe_self_reminder_days: number;
  talk_to_safe_self_reminder_email: boolean;
  talk_to_safe_self_reminder_notification: boolean;
  trigger_prep_event_email: boolean;
  trigger_prep_event_notification: boolean;
  weekly_commitment_reminder_email: boolean;
  weekly_commitment_reminder_notification: boolean;
}
