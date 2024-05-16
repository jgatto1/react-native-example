import React from 'react';

import { LANTERN_REQUIRES } from './models/lantern/Lantern.require';
import { ViroNode, ViroOmniLight, ViroSphere } from '@viro-community/react-viro';
import { CommonViroObject } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/components/CommonViroObject';

export const Lantern = () => {
  return (
    <ViroNode position={[0.05, 0.11, -0.02]} scale={[1.1, 1.1, 1.1]}>
      <CommonViroObject {...LANTERN_REQUIRES.LANTERN} scale={0.00045} position={[0, 0.3, 0]} />
      <ViroSphere
        heightSegmentCount={20}
        widthSegmentCount={20}
        scale={[1, 1, 1]}
        radius={0.005}
        position={[0, 0.24, 0]}
        lightReceivingBitMask={3}
      />
      <ViroOmniLight
        color='#ffffff'
        intensity={1000}
        influenceBitMask={3}
        attenuationStartDistance={3}
        attenuationEndDistance={6}
        position={[0, 0.26, 0]}
      />
    </ViroNode>
  );
};
