import { F, Res } from 'model/backend/index';

export interface InterestGroup {
  description?: string;
  id: number;
  is_deleted: boolean;
  name: string;
}

export interface InterestGroupJoined extends InterestGroup {
  joined: boolean;
}

export declare type InterestGroupsRes = Res<F<'interest_groups', InterestGroup[]>>;

export declare type InterestGroupRes = Res<F<'interest_group', InterestGroup>>;
