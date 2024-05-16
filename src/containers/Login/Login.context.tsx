import React, { useContext, useState } from 'react';

export declare type STATE = 'SignIn' | 'SignUp' | 'ForgotPass' | 'ResetPass';

interface ILoginContext {
  state: STATE;
  goTo: (state: STATE) => void;
  setTokenRecover: (t: string) => void;
  tokenRecover: string;
}

const Context = React.createContext<ILoginContext>({} as ILoginContext);

export const useLoginContext = () => useContext(Context);

export const LoginContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<STATE>('SignIn');
  const [tokenRecover, setTokenRecover] = useState<string>('');

  const context: ILoginContext = {
    state,
    goTo: (newState) => setState(newState),
    setTokenRecover,
    tokenRecover,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
