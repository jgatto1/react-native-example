import React, { useContext, useEffect, useState } from 'react';
import { Progress, ProgressRes } from 'model/backend/progress';
import { validateResponse } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';

interface IProgressContext {
  loading?: boolean;
  refresh: () => void;
  progress?: Progress;
}

const Context = React.createContext<IProgressContext>({} as IProgressContext);

export const useProgress = () => useContext(Context);

const fetchProgress = async (onDone: (progress: Progress) => void) => {
  BackendClient.get<ProgressRes>('/progress')
    .then(validateResponse)
    .then((res) => onDone(res.progress))
    .catch((err) => {
      console.warn('Cannot fetch progress', err);
    });
};

export const ProgressProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Progress>();

  useEffect(() => {
    setLoading(true);
    fetchProgress((p) => setProgress(p)).then(() => setLoading(false));
  }, []);

  const refresh = () => {
    setLoading(true);
    fetchProgress((p) => setProgress(p)).then(() => setLoading(false));
  };

  const value: IProgressContext = { loading, refresh, progress };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
