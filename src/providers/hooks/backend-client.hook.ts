import { BackendClient } from 'service/backend-client.service';
import axios from 'axios';
import { useSession } from 'providers/session/SessionProvider';

/**
 * Probably is not necessary with axios ({@link BackendClient} has withCredentials which storage the cookies)
 */
export const useBackendClient = () => {
  const session = useSession();

  const client = axios.create(BackendClient.defaults);

  client.interceptors.request.use(async (config) => {
    const cookie = session.data?.accessToken;
    if (cookie) {
      config.headers.Cookie = `session=${cookie}`;
      config.headers.Authorization = `Bearer ${cookie}`;
    }
    return config;
  });

  return client;
};
