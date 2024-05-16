import React from 'react';

export interface ModelRequire {
  resources: number[];
  source: number;
  animation?: boolean;
  scale?: number;
  position?: number[];
  rotation?: number[];
  duration?: number;
}

export interface ModelRequires {
  [key: string]: ModelRequire;
}

export interface TreeFactoryProps {
  tree: ModelRequire;
  flowers: ModelRequire[];
  fruits: ModelRequire[];
  leaves: ModelRequire[];
  butterflies: ModelRequire[];
}

export interface TreeProps {
  fruits?: number;
  leaves?: number;
  flowers?: number;
  butterflies?: number;
  onLoad?: () => void;
}

export declare type Tree = React.VFC<TreeProps>;
export declare type TreeFactory = (props: TreeFactoryProps) => Tree;
