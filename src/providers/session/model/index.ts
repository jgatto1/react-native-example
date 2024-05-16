import { User } from 'model/backend/login';

export interface Session {
  login: (data: SessionData) => void;
  updateUserData: (user: User) => void;
  logout: () => void;
  setUserSubscribed: () => void;
  data?: SessionData;
  loading?: boolean;
}

export interface SessionData {
  name: string;
  lastName: string;
  study: {
    id: string | number;
    initials: string;
  };
  accessToken: string;
  refreshToken: string;
  fcmToken?: string;
  user: User;
  subscribed?: boolean;
  trial_expired?: boolean;
}

export interface SessionHook extends Session {
  readonly isLogged: boolean;
  readonly isSubscribed: boolean;
  readonly isExpired: boolean;
  readonly onboarded: boolean;
  readonly userUUID?: string | null;
}
