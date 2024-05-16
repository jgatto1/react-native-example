import React, { useContext, useState } from 'react';
import { ViroAnimations } from '@viro-community/react-viro';

interface ITree3DViewContextAnimation {
  enable: boolean;
  name?: string;
}

export declare type ITree3DViewRotateDirection = 'LEFT' | 'RIGHT';

interface ITree3DViewContext {
  rotate: (direction: ITree3DViewRotateDirection) => void;
  rotationAnimation: ITree3DViewContextAnimation;
  finish: () => void;
  progressView?: boolean;
}

const Context = React.createContext({} as ITree3DViewContext);

export const useTree3DViewContext = () => useContext(Context);

interface Tree3DViewProviderProps {
  progressView?: boolean;
}

export const Tree3DViewContextProvider: React.FC<Tree3DViewProviderProps> = ({ children, ...props }) => {
  const [rotation, setRotation] = useState<ITree3DViewContextAnimation>({ enable: false });

  const value: ITree3DViewContext = {
    rotate: (direction) => setRotation({ enable: true, name: nameFrom(direction) }),
    rotationAnimation: rotation,
    finish: () => setRotation({ enable: false }),
    ...props,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

enum Tree3DAnimations {
  ROTATE_LEFT = 'RotateLeft',
  ROTATE_RIGHT = 'RotateRight',
}

const nameFrom = (direction: ITree3DViewRotateDirection): Tree3DAnimations => {
  return direction === 'LEFT' ? Tree3DAnimations.ROTATE_LEFT : Tree3DAnimations.ROTATE_RIGHT;
};

ViroAnimations.registerAnimations({
  [Tree3DAnimations.ROTATE_RIGHT]: {
    properties: { rotateY: '+=40' },
    duration: 200,
  },
  [Tree3DAnimations.ROTATE_LEFT]: {
    properties: { rotateY: '-=40' },
    duration: 200,
  },
});
