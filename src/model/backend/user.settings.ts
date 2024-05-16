export interface UserSettings {
  display_name: string;
  email_address?: string;
  phone_number_text?: string;
  phone_number_call?: string;
  about_me_short?: string;
  about_me_long?: string;
  hide_interest_groups: boolean;
  hide_about_me: boolean;
  emotional_status?: number;
  is_onboarded: boolean;
  share_with_all?: boolean;
  available_to_chat?: boolean;
  progress_report_days?: number;
}
