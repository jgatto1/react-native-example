import { ScheduledEvent } from 'model/backend/scheduled-event';
import { F, Res } from 'model/backend/index';

export interface TriggerPrepEventCreate {
  app_action?: string;
  when: string; // datetime
  message: string;
}

export interface TriggerPrepEvent {
  app_action: string;
  id: number;
  message: string;
  scheduled_event: ScheduledEvent;
  user_uuid: string;
}

export declare type TriggerPrepEventsRes = Res<F<'trigger_prep_events', TriggerPrepEvent[]>>;
