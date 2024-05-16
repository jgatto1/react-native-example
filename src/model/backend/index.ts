import { User } from 'model/backend/login';
import { ProfileInterestGroup } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import { AxiosResponse } from 'axios';

declare type CommonResponseStatus = 'ok' | 'error' | null | undefined;

export interface BaseResponse {
  error?: string | null;
  status?: CommonResponseStatus;
}

export declare type CommonResponse<Name extends string, T> = { [Key in Name]: T } & BaseResponse;

/**
 * Generic type to use when response has multiple custom fields. Example
 * ```
 * const res: Res<F<'user', User> & F<'interest_groups', ProfileInterestGroup[]>>;
 * res.interest_groups
 * res.user
 * res.error
 * res.status
 * ```
 */
export declare type Res<T = {}> = T & BaseResponse;
export declare type F<Name extends string, T> = { [Key in Name]: T };

/**
 * Common F's
 */
export declare type FUser = F<'user', User>;
export declare type FGroups = F<'interest_groups', ProfileInterestGroup[]>;

declare type NullableBaseResponse = BaseResponse | null | undefined;

export const isOKRes = (baseResponse: NullableBaseResponse): boolean => {
  return baseResponse?.status === 'ok';
};

export const isErrorRes = (baseResponse: NullableBaseResponse): boolean => {
  return !isOKRes(baseResponse);
};

export const resError = (baseResponse: NullableBaseResponse): string => {
  return baseResponse?.error || 'Unknown error';
};

export function validateResponse<T extends BaseResponse>(res: Partial<AxiosResponse<T>>): T {
  if (!res.data || isErrorRes(res.data)) {
    throw new Error(`Error while request ${res.config?.method} to ${res.config?.url}. ${res.data}`);
  }
  return res.data;
}
