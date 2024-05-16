import { SafeUnsafe, SafeUnsafeListRes, SafeUnsafeRes } from 'model/backend/safe-unsafe';
import React, { useContext, useEffect, useState } from 'react';
import { validateResponse } from 'model/backend';
import { BackendUpload, Base64UploadFile } from 'service/backend-client.upload.service';
import { BackendClient } from 'service/backend-client.service';

interface ISafetyPictureContext {
  safe?: SafeUnsafe;
  unsafe?: SafeUnsafe;
  loading: boolean;
  updateDescription: (description: string, isSafe: boolean) => Promise<void>;
  setSafe: (base64: string, description: string) => Promise<void>;
  setUnsafe: (base64: string, description: string) => Promise<void>;
  deleteSafe: () => void;
  deleteUnsafe: () => void;
}

const Context = React.createContext<ISafetyPictureContext>({} as ISafetyPictureContext);

export const useSafetyPictureContext = () => useContext(Context);

export const SafetyPictureProvider: React.FC = ({ children }) => {
  const [safe, setSafe] = useState<SafeUnsafe>();
  const [unsafe, setUnsafe] = useState<SafeUnsafe>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // mockOkReq(SAFE_UNSAFES)
    BackendClient.get<SafeUnsafeListRes>('/safe_unsafes')
      .then(validateResponse)
      .then((data) => {
        const safeRes = data.safe_unsafes.find((s) => s.is_safe);
        setSafe(safeRes);
        const unsafeRes = data.safe_unsafes.find((s) => !s.is_safe);
        setUnsafe(unsafeRes);
      })
      .catch((err) => console.warn('Cannot load safe unsafe', err))
      .finally(() => setLoading(false));
  }, []);

  const setFor = (isSafe: boolean) => (base64: string, description: string) => {
    const b64File: Base64UploadFile = {
      base64: base64,
      filename: isSafe ? 'safe.png' : 'unsafe.png',
      type: 'image/png',
    };
    const is_safe = isSafe ? 'true' : 'false';
    setLoading(true);
    console.debug('Setting safe / unsafe picture', { description, is_safe, b64File: b64File.filename });
    // return mockOkReq(SAFE_UNSAFE)
    return BackendUpload.post<SafeUnsafeRes>('/safe_unsafe/create', b64File, { is_safe, description })
      .then(validateResponse)
      .then((data) => {
        const setter = isSafe ? setSafe : setUnsafe;
        setter(data.safe_unsafe);
      })
      .catch((err) => console.warn(`Cannot set ${!isSafe ? 'un' : ''}safe picture`, err))
      .finally(() => setLoading(false));
  };

  const deleteFor = (isSafe: boolean) => () => {
    const id = isSafe ? safe?.id : unsafe?.id;
    if (!id) {
      return;
    }
    setLoading(true);
    BackendClient.delete<SafeUnsafeRes>(`/safe_unsafe/${id}/delete`)
      .then(validateResponse)
      .then(() => {
        const setter = isSafe ? setSafe : setUnsafe;
        setter(undefined);
      })
      .catch((err) => console.warn(`Cannot delete ${!isSafe ? 'un' : ''}safe picture`, err))
      .finally(() => setLoading(false));
  };

  const updateDescriptionFor = (description: string, isSafe: boolean) => {
    const id = isSafe ? safe?.id : unsafe?.id;
    if (!id) {
      return Promise.resolve();
    }
    setLoading(true);
    return BackendClient.put<SafeUnsafeRes>(`/safe_unsafe/${id}`, { description })
      .then(validateResponse)
      .then((res) => {
        const setter = isSafe ? setSafe : setUnsafe;
        setter(res.safe_unsafe);
      })
      .catch((err) => console.warn('Cannot update safe/unsafe description', err))
      .finally(() => setLoading(false));
  };

  const value: ISafetyPictureContext = {
    safe,
    unsafe,
    loading,
    updateDescription: (description, isSafe) => updateDescriptionFor(description, isSafe),
    setSafe: setFor(true),
    setUnsafe: setFor(false),
    deleteSafe: deleteFor(true),
    deleteUnsafe: deleteFor(false),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
