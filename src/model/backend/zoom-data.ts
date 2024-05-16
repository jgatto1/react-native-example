import { F, Res } from '.';

export interface Meeting {
  cohort_id: number;
  details: MeetingDetails;
  feedback_url: string;
  id: number;
  topic_id: number;
}

export interface MeetingDetails {
  agenda?: string;
  assistant_id?: string;
  created_at: string;
  duration: number;
  encrypted_password: string;
  h323_password: string;
  host_email: string;
  host_id: string;
  id: number;
  join_url: string;
  password: string;
  pre_schedule?: boolean;
  pstn_password: string;
  registration_url: string;
  settings: MeetingSettings;
  start_time: string;
  start_url: string;
  status: string;
  timezone: string;
  topic: string;
  type: number;
  uuid: string;
}

export interface MeetingSettings {
  allow_multiple_devices: boolean;
  alternative_hosts: string;
  alternative_hosts_email_notification?: boolean;
  approval_type: number;
  approved_or_denied_countries_or_regions: ApprovedOrDeniedCountriesOrRegions;
  audio: string;
  auto_recording: string;
  breakout_room: ApprovedOrDeniedCountriesOrRegions;
  close_registration: boolean;
  cn_meeting: boolean;
  contact_email: string;
  contact_name: string;
  device_testing: boolean;
  encryption_type: string;
  enforce_login: boolean;
  enforce_login_domains: string;
  global_dial_in_countries: string[];
  global_dial_in_numbers: GlobalDialInNumber[];
  host_video: boolean;
  in_meeting: boolean;
  jbh_time: number;
  join_before_host: boolean;
  meeting_authentication: boolean;
  mute_upon_entry: boolean;
  participant_video: boolean;
  registrants_confirmation_email: boolean;
  registrants_email_notification: boolean;
  request_permission_to_unmute_participants: boolean;
  show_share_button: boolean;
  use_pmi: boolean;
  waiting_room: boolean;
  watermark: boolean;
}

export interface ApprovedOrDeniedCountriesOrRegions {
  enable: boolean;
}

export interface RecordingUrl {
  url: string;
}

export interface MeetingRegistrant {
  id: number;
  join_url: string;
  registrant_id: string;
  start_time: string;
  topic: string;
}

export interface GlobalDialInNumber {
  city?: string;
  country: string;
  country_name: string;
  number: string;
  type: string;
}

export declare type MeetingsRes = Res<F<'meetings', Meeting[]>>;
export declare type MeetingRes = Res<F<'meeting', Meeting>>;
export declare type MeetingRegistrantRes = Res<F<'meeting_registrant', MeetingRegistrant>>;
