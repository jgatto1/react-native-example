import { F, Res } from 'model/backend/index';

export interface TriggerPrepCreate {
  safety_actions: string[];
  tags: string[];
}

export interface TriggerPrep extends TriggerPrepCreate {
  id: number;
  user_uuid: string;
}

export declare type TriggerPrepRes = Res<F<'trigger_prep', TriggerPrep>>;
