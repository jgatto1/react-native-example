import React from 'react';
import { ModelRequire } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/model';
import { CommonViroObject } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/components/CommonViroObject';

interface Props {
  elements: ModelRequire[];
  amount?: number;
}

export const CommonViroObjects: React.VFC<Props> = ({ elements, amount }) => {
  const toRender = typeof amount !== 'number' ? 0 : Math.min(amount, elements.length);
  return toRender === 0 ? (
    <></>
  ) : (
    <>
      {elements.slice(0, toRender).map((e, i) => (
        <CommonViroObject key={i} {...e} />
      ))}
    </>
  );
};
