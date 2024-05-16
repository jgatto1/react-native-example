import { F, Res } from 'model/backend/index';

export interface Topic {
  handout_url: string;
  id: number;
  is_deleted: boolean;
  name: string;
  quiz_url: string;
}

export declare type TopicRes = Res<F<'topic', Topic>>;
