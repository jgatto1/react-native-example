import axios, { AxiosRequestConfig } from 'axios';

// export const BASE_URL = 'http://localhost:5000/api/v1';
export const BASE_URL = 'https://staging-pss.virtualabvr.com/api/v1';
// export const BASE_URL_V1 = 'http://staging-pss.virtualabvr.com:5001/api/v1';
export const BASE_URL_V2 = 'https://staging-pss.virtualabvr.com/api/v2';

export const BackendClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

BackendClient.interceptors.request.use((req) => {
  const { params, headers, data } = req;
  console.debug(`Request ${req.method} ${req.url}`, { params, headers, data, req });
  return req;
});

BackendClient.interceptors.response.use((res) => {
  const config: AxiosRequestConfig = res.config;
  const { status, headers } = res;
  console.debug(`Response ${config?.method || 'NaN'} ${config.url || 'NaN'} [${status}]`, { headers, res });
  return res;
});
