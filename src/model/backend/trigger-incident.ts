import { F, Res } from 'model/backend/index';

export interface Location {
  lat: number;
  long: number;
}

export interface TriggerIncidentCreate {
  location?: Location | null;
  severity: number;
  tags: string[];
  topic_id?: number | null;
}

export interface TriggerIncident extends TriggerIncidentCreate {
  created: string;
  id: number;
  modified: string;
  user_uuid: string;
}

export declare type TriggerIncidentRes = Res<F<'trigger_incident', TriggerIncident>>;

export declare type TriggerIncidentsRes = Res<F<'trigger_incidents', TriggerIncident[]>>;
