import React, { useContext, useEffect, useState } from 'react';
import { ViroUtils } from '@viro-community/react-viro';

declare type Support = 'YES' | 'NO' | 'LOADING';

interface IContext {
  support: Support;
}

const Context = React.createContext<IContext>({} as IContext);

export const useARSupportedContext = () => useContext(Context);

export const ARSupportedContextProvider: React.FC = ({ children }) => {
  const [support, setSupport] = useState<Support>('LOADING');

  useEffect(() => {
    ViroUtils?.isARSupportedOnDevice(
      () => setSupport('NO'),
      () => setSupport('YES')
    );
  }, []);

  return <Context.Provider value={{ support }}>{children}</Context.Provider>;
};
