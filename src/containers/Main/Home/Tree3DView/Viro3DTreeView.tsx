import {
  Viro3DSceneNavigator,
  ViroAmbientLight,
  ViroBox,
  ViroDirectionalLight,
  ViroMaterials,
  ViroNode,
  ViroScene,
} from '@viro-community/react-viro';
import { useTree3DViewContext } from 'containers/Main/Home/Tree3DView/Tree3DView.context';
import { TreeSize, useTreeProgressContext } from 'containers/Main/Home/AR/TreeProgress/TreeProgress.context';
import { BigTree, MidTree, SmallTree } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/Trees';
import { Lantern } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/Lantern';
import React, { useEffect } from 'react';

const SCALES: { [key in TreeSize]: number[] } = {
  BIG: [0.12, 0.12, 0.12],
  MID: [0.18, 0.18, 0.18],
  SMALL: [0.32, 0.32, 0.32],
};

const SCALES_PROGRESS: { [k in TreeSize]: { scale: number[]; position: number[]; rotation: number[] } } = {
  BIG: {
    scale: [0.27, 0.27, 0.27],
    position: [0, -0.14, -0.15],
    rotation: [-35, 0, 0],
  },
  MID: {
    scale: [0.33, 0.33, 0.33],
    position: [0, -0.14, -0.15],
    rotation: [-35, 0, 0],
  },
  SMALL: {
    scale: [0.21, 0.21, 0.21],
    position: [0, -0.14, -0.15],
    rotation: [-35, 0, 0],
  },
};

const SCALES_3D: { [k in TreeSize]: { scale?: number[]; position?: number[]; rotation?: number[] } } = {
  BIG: {
    rotation: [-5, 210, 0],
    scale: [0.11, 0.11, 0.11],
  },
  MID: {
    rotation: [8, 0, 0],
  },
  SMALL: {
    rotation: [8, 0, 0],
  },
};

const viro3DTreeViewSceneFactory = (progressView: boolean) => () => {
  const tree3DContext = useTree3DViewContext();
  const treeProgress = useTreeProgressContext();

  useEffect(() => {
    if (treeProgress.loadContext) {
      treeProgress.loadContext();
    }
  }, [treeProgress]);

  console.log('treeProgress.objects', treeProgress);

  const animation = React.useMemo(() => {
    return tree3DContext.rotationAnimation || { name: 'NaN', enable: false };
  }, [tree3DContext.rotationAnimation]);

  const size = treeProgress.size;

  return (
    <ViroScene>
      <ViroAmbientLight color='#ffffff' influenceBitMask={2} intensity={1000} />
      <ViroDirectionalLight direction={[0, -1, -1]} influenceBitMask={3} intensity={500} />
      <ViroBox
        opacity={progressView ? 200 : 1.4}
        position={[0, 0, -20]}
        scale={[50, 40, 0.01]}
        rotation={[0, 0, 0]}
        materials={[progressView ? Tree3DMaterials.NO_BG : Tree3DMaterials.BG]}
        lightReceivingBitMask={2}
      />
      {!treeProgress.loading && (
        <ViroNode
          scale={SCALES[size]}
          position={[0, -0.068, -0.15]}
          {...(progressView ? SCALES_PROGRESS[size] : SCALES_3D[size])}>
          <ViroNode
            animation={{
              loop: false,
              name: animation.name,
              run: animation.enable,
              onFinish: () => tree3DContext.finish(),
            }}>
            {size === 'SMALL' && <SmallTree {...treeProgress.objects} />}
            {size === 'MID' && <MidTree {...treeProgress.objects} />}
            {size === 'BIG' && (
              <>
                {treeProgress.lantern && <Lantern />}
                <BigTree {...treeProgress.objects} />
              </>
            )}
          </ViroNode>
        </ViroNode>
      )}
    </ViroScene>
  );
};

const Viro3DSceneHome = viro3DTreeViewSceneFactory(false);
const Viro3DSceneProgress = viro3DTreeViewSceneFactory(true);

enum Tree3DMaterials {
  BG = 'Background',
  NO_BG = 'NoBackground',
  GREEN = 'Green',
}

ViroMaterials.createMaterials({
  [Tree3DMaterials.BG]: {
    lightingModel: 'Constant',
    diffuseTexture: require('./assets/ar_gradient_bg.png'),
  },
  [Tree3DMaterials.NO_BG]: {
    lightingModel: 'Constant',
    diffuseColor: '#ffffff',
  },
  [Tree3DMaterials.GREEN]: {
    lightingModel: 'Constant',
    diffuseColor: '#65a175',
  },
});

const viro3DTreeView = (scene: Function) => () => {
  return <Viro3DSceneNavigator onExitViro={() => console.log('Exit scene')} initialScene={{ scene }} />;
};

export const Viro3DTreeViewHome = viro3DTreeView(Viro3DSceneHome);
export const Viro3DTreeViewProgress = viro3DTreeView(Viro3DSceneProgress);
