import { F, Res } from 'model/backend/index';

export interface Commitment {
  by_when: null;
  created: string;
  id: number;
  is_completed: boolean;
  is_deleted: boolean;
  modified: string;
  plan_a: string;
  plan_b: string;
  promise: string;
  reason: string;
  reward: string;
  topic_id: number;
  user_uuid: string;
}

export declare type CommitmentsRes = Res<F<'commitments', Commitment[]>>;

export declare type CommitmentRes = Res<F<'commitment', Commitment>>;
