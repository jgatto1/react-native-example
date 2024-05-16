import { Viro3DObject } from '@viro-community/react-viro';
import React from 'react';
import { ModelRequire } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/model';

interface OnLoad {
  onLoad?: () => void;
}

export const CommonViroObject: React.VFC<ModelRequire & OnLoad> = ({
  source,
  resources,
  position,
  scale,
  rotation,
  animation,
  duration,
  onLoad,
}) => {
  const anim = React.useMemo(
    () => (animation ? { loop: true, run: true, duration: duration } : undefined),
    [duration, animation]
  );
  return (
    <Viro3DObject
      // highAccuracyEvents={true}
      onLoadEnd={onLoad}
      source={source}
      resources={resources}
      position={Array.isArray(position) ? position : [0, 0, 0]}
      scale={typeof scale === 'number' && scale > 0 ? [scale, scale, scale] : [0.025, 0.025, 0.025]}
      rotation={rotation}
      type='VRX'
      animation={anim}
      lightReceivingBitMask={3}
      shadowCastingBitMask={2}
    />
  );
};
