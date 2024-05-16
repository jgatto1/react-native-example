import { InputLoginType } from 'providers/hooks/code-validator.hook';
import { SessionData } from 'providers/session/model';
import { Type } from '../validator/email.validator';

export const calculateInputLoginType = (type: Type): string => {
  return type === 'EMAIL' ? InputLoginType.EMAIL : InputLoginType.CELL_PHONE;
};

export const generateSessionData = (login: any): SessionData => {
  return {
    accessToken: login.access_token,
    lastName: login.user.last_name || '',
    name: login.user.first_name || '',
    refreshToken: login.refresh_token || '',
    study: { id: login.user.study_id, initials: login.user.study_initials },
    user: login.user,
  };
};
