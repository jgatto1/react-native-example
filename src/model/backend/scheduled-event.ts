import { F, Res } from 'model/backend/index';

declare type Nullable<T> = T | null;

export interface ScheduledEvent {
  end_at: string;
  event_name: Nullable<string>;
  event_type: Nullable<string>;
  id: number;
  invitees: Invitee[];
  is_deleted: boolean;
  repeats: any[];
  resource_id: string;
  resource_type: string;
  start_at: string;
}

export interface Invitee {
  id: number;
  invitee_id: string;
  invitee_type: string;
  is_deleted: boolean;
  scheduled_event_id: number;
}

export declare type ScheduledEventsRes = Res<F<'scheduled_events', ScheduledEvent[]>>;
