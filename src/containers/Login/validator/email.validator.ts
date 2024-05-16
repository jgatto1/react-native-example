import * as EmailValidator from 'email-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';

export declare type Type = 'PHONE' | 'EMAIL';

export interface ContactValidResult {
  valid: boolean;
  type?: Type;
}

const VALID_EMAIL: ContactValidResult = { valid: true, type: 'EMAIL' };
const VALID_PHONE: ContactValidResult = { valid: true, type: 'PHONE' };
const INVALID: ContactValidResult = { valid: false };

const isEmail = (email: string) => {
  return EmailValidator.validate(email) && VALID_EMAIL;
};

const isPhone = (phone: string) => {
  return isValidPhoneNumber(phone, 'US') && VALID_PHONE;
};

const validateContact = (input?: string): ContactValidResult => {
  if (!input) {
    return INVALID;
  }
  return isEmail(input) || isPhone(input) || INVALID;
};

export const LoginValidator = {
  validateContact,
  isEmail,
  isPhone,
};
