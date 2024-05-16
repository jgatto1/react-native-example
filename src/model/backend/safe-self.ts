import { F, Res } from 'model/backend/index';

export interface SafeSelf {
  audio_url: string;
  id: number;
  photo_url_512: string | null;
  text: string | null;
  user_uuid: string;
}

export declare type SafeSelfRes = Res<F<'safe_self', SafeSelf>>;
