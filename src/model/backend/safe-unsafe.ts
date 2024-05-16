import { F, Res } from 'model/backend/index';

export interface SafeUnsafe {
  description: string;
  id: number;
  is_safe: boolean;
  picture_url_512: string;
  user_uuid: string;
}

export declare type SafeUnsafeListRes = Res<F<'safe_unsafes', SafeUnsafe[]>>;

export declare type SafeUnsafeRes = Res<F<'safe_unsafe', SafeUnsafe>>;
