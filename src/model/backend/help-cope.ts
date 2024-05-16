import { F, Res } from 'model/backend/index';
import { User } from 'model/backend/login';

export interface HelpCope {
  created: string;
  id: number;
  is_deleted: boolean;
  is_read_by_me: boolean;
  modified: string;
  text: string;
  user_uuid: string;
}

export interface HelpCopeWithUser extends HelpCope {
  user?: User;
}

export declare type HelpCopesRes = Res<F<'help_copes', HelpCope[]>>;

export declare type HelpCopeRes = Res<F<'help_cope', HelpCope>>;
