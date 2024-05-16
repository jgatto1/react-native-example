import { validateResponse } from 'model/backend';
import { useRef, useState } from 'react';
import { BackendClient, BASE_URL_V2 } from 'service/backend-client.service';

/**
 * Probably is not necessary with axios ({@link BackendClient} has withCredentials which storage the cookies)
 */
export enum InputLoginType {
  EMAIL = 'email',
  CELL_PHONE = 'cell_phone',
}

export const useCodeValidator = () => {
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const codeSent = useRef(false);

  const post = async (url: string, data: any, token?: string, isRend?: boolean): Promise<any> => {
    setMsg('');
    if (isRend) {
      // if resend set to false so that we don't get any wrong code error
      codeSent.current = false;
      // setMsg('code resend')
    }
    return BackendClient.post(url, data, {
      baseURL: BASE_URL_V2,
      withCredentials: false,
      headers: { ...(token && { 'X-EMO-2FA': token }) },
    })
      .then((res) => {
        console.log('validation res', res, res.status);
        if (res.status === 202) {
          // if the user had sent the otp token but is still getting 202 show an error msg.
          // Note: This implementation should be done by the server
          if (codeSent.current) {
            setMsg('Oops, wrong code. We sent a new one.');
          }
          codeSent.current = true; // the first time the server will throw 202 for indicating the otp token required
          setShowValidationModal(true);
        } else if (res.status === 200) {
          setShowValidationModal(false);
          codeSent.current = false;
          return validateResponse(res);
        } else {
          throw Error('invalid code');
          // TODO: another code when the code sent is invalid
        }
      })
      .catch((error) => {
        console.warn(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setMsg(error.response.data.error ?? 'error while validating the code. Please try again');
        }
        throw Error(error);
      });
  };

  const onClose = () => {
    setMsg('');
    setShowValidationModal(false);
    codeSent.current = false;
  };

  return { post, onClose, showValidationModal, msg };
};
