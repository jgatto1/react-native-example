import { F, Res } from 'model/backend/index';

export interface SafetyPlanMethod {
  description: string;
  text: string;
}

export interface SafetyPlan {
  id: number;
  method_0?: SafetyPlanMethod;
  method_1?: SafetyPlanMethod;
  method_2?: SafetyPlanMethod;
  type: 'safety_plan';
}

export interface SafetyPlanUpdateReq {
  data: {
    safety_plan: SafetyPlan[];
  };
}

interface SafetyPlanResponse extends SafetyPlanUpdateReq {
  created: string;
  id: number;
  modified: string;
  user_uuid: string;
}

export declare type SafetyPlanRes = Res<F<'safety_plan', SafetyPlanResponse>>;

export interface BoomerangScheduledEventInvite {
  id: number;
  invitee_id: string;
  invitee_type: string;
  is_deleted: boolean;
  scheduled_event_id: number;
}

export interface BoomerangScheduledEventRepeat {
  id: number;
  interval_seconds?: any;
  scheduled_event_id: number;
  to_char_pattern: string;
  to_char_value: number;
}

export interface BoomerangScheduledEvent {
  end_at: string;
  event_name?: any;
  event_type?: any;
  id: number;
  invitees: BoomerangScheduledEventInvite[];
  is_deleted: boolean;
  repeats: BoomerangScheduledEventRepeat[];
  resource_id: string;
  resource_type: string;
  start_at: string;
}

export interface Boomerang {
  goal: string;
  id: number;
  is_content_chosen: boolean;
  is_weekly: boolean;
  is_when_random: boolean;
  link: string;
  message: string | null;
  reminder: string;
  scheduled_event: BoomerangScheduledEvent;
  user_uuid: string;
}

export interface EnabledFeature {
  enabled_feature: string;
  is_new_to_me: boolean;
}

export declare type EnabledFeaturesRes = Res<F<'enabled_features', EnabledFeature[]>>;
export declare type SafetyBoomerangRes = Res<F<'boomerangs', Boomerang[]>>;
