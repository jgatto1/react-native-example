import { AxiosResponse } from 'axios';
import { BaseResponse } from 'model/backend';

declare type PartialAxiosRes<T> = Promise<Partial<AxiosResponse<BaseResponse & T>>>;

interface MockReqOpts {
  delay?: number;
  status?: number;
  exception?: Error;
  error?: string;
}

const DEFAULT_OPTS: MockReqOpts = {
  delay: 1000,
  status: 200,
};

export function mockOkReq<T = {}>(data?: T, opts?: MockReqOpts): PartialAxiosRes<T> {
  const finalOpts = Object.assign(DEFAULT_OPTS, opts);
  const axiosRes: Partial<AxiosResponse<BaseResponse & T>> = {
    data: {
      status: 'ok',
      error: null,
      ...(data || ({} as T)),
    },
    status: finalOpts.status,
  };
  return new Promise((res) => setTimeout(() => res(axiosRes), finalOpts.delay));
}

export function mockBadReq(opts?: MockReqOpts): PartialAxiosRes<{}> {
  return mockOkReq({ status: 'error', error: opts?.error || 'An Error' }, opts);
}

export function mockExceptionalReq(opts?: MockReqOpts): PartialAxiosRes<{}> {
  return mockOkReq({}, opts).then(() => {
    throw opts?.exception || new Error('An Exception');
  });
}
