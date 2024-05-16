import { F, Res } from 'model/backend/index';

export interface TrustedPerson {
  cell_phone: string;
  email?: string;
  first_name: string;
  home_phone?: any;
  last_name: string;
  user_uuid: string;
  uuid: string;
}

export declare type TrustedPersonCreate = Pick<TrustedPerson, 'cell_phone'> &
  Partial<Pick<TrustedPerson, 'email' | 'first_name'>>;

export declare type TrustedPeopleRes = Res<F<'trusted_people', TrustedPerson[]>>;

export declare type TrustedPersonRes = Res<F<'trusted_person', TrustedPerson>>;
