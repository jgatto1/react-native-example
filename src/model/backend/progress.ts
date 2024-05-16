import { F, Res } from 'model/backend/index';

export interface DailyQuest {
  avg_cohort_quests: number;
  my_quests: number;
}

export interface DailyQuiz {
  avg_cohort_quizzes: number;
  my_quizzes: number;
}

export interface DailySafetyCheck {
  avg_cohort_checks: number;
  days: number;
  my_checks: number;
}

export interface DailySafetyReflection {
  avg_cohort_reflections: number;
  my_reflections: number;
}

export interface LearnReflections {
  avg_cohort_reflections: number;
  my_reflections: number;
}

export interface MySafePlacePosts {
  avg_cohort_posts: number;
  my_posts: number;
}

export interface PrepareForATrigger {
  avg_cohort_trigger_preps: number;
  my_trigger_preps: number;
}

export interface SafetyBoomerang {
  avg_cohort_boomerangs: number;
  my_boomerangs: number;
}

export interface SafetyPlanCheck {
  avg_cohort_checks: number;
  my_checks: number;
}

export interface SafetySurprise {
  avg_cohort_surprises: number;
  my_surprises: number;
}

export interface SetUpSafetyTools {
  safe_unsafe_picture: boolean;
  safety_plan_wizard: boolean;
  talk_to_safe_self: boolean;
}

export interface SocialFeedPosts {
  avg_cohort_posts: number;
  my_posts: number;
}

export interface TriggerSeverity {
  date: string;
  dow: number;
  severity: number;
  topic_id?: any;
  topic_name?: any;
}

export interface WeeklyCommitment {
  did_commitment: boolean;
  is_future: boolean;
  topic_id: number;
  topic_name: string;
}

export interface WeeklyMeetingAttendance {
  attendance?: 'full' | 'half' | null;
  did_attend_meeting: boolean;
  is_future: boolean;
  meeting_id: number;
  topic_id: number;
  topic_name: string;
}

export interface WeeklyPowerUp {
  did_power_up: boolean;
  is_future: boolean;
  topic_id: number;
  topic_name: string;
}

export interface Progress {
  count_topics_so_far: number;
  daily_quest: DailyQuest;
  daily_quiz: DailyQuiz;
  daily_safety_check: DailySafetyCheck;
  daily_safety_reflection: DailySafetyReflection;
  learn_reflections: LearnReflections;
  my_safe_place_posts: MySafePlacePosts;
  prepare_for_a_trigger: PrepareForATrigger;
  safety_boomerang: SafetyBoomerang;
  safety_plan_check: SafetyPlanCheck;
  safety_surprise: SafetySurprise;
  set_up_safety_tools: SetUpSafetyTools;
  social_feed_posts: SocialFeedPosts;
  trigger_severity: TriggerSeverity[];
  weekly_commitment: WeeklyCommitment[];
  weekly_meeting_attendance: WeeklyMeetingAttendance[];
  weekly_power_up: WeeklyPowerUp[];
}

export declare type ProgressRecipientsRes = Res<F<'recipients', string[]>>;

export declare type ProgressRes = Res<F<'progress', Progress>>;

export declare type WeeklyMeetingAttendanceRes = Res<
  F<'progress_weekly_meeting_attendance', WeeklyMeetingAttendance[]>
>;

export interface ProgressTree {
  leaves: number;
  flowers: number;
  butterflies: number;
  fruits: number;
  size_thresholds: {
    small: ProgressTreeSizeThreshold;
    mid: ProgressTreeSizeThreshold;
    big: ProgressTreeSizeThreshold;
  };
  size: string;
  lantern: boolean;
}

export interface ProgressTreeSizeThreshold {
  leaves: number;
  flowers: number;
  butterflies: number;
  fruits: number;
}

export declare type ProgressTreeRes = Res<F<'progress_tree', ProgressTree>>;
