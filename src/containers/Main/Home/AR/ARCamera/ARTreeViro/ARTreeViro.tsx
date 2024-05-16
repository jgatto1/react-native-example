import React, { createRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlane,
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroDirectionalLight,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import { ViroStatics } from './ARTreeViro.statics';
import { StyleSheet, View } from 'react-native';
import { useTreeProgressContext } from 'containers/Main/Home/AR/TreeProgress/TreeProgress.context';
import { BigTree, MidTree, SmallTree } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/Trees';
import { Lantern } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/Lantern';

const ARTreeViro: React.VFC = () => {
  const treeContext = useARTreeContext();
  const treeProgress = useTreeProgressContext();
  const [showPlate, setShowPlate] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pause, setPause] = useState(false);
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    if (treeProgress.loadContext) {
      treeProgress.loadContext();
    }
  }, [treeProgress]);

  const onLogoClick = (s: 1 | 2 | 3) => {
    if (s !== 3) {
      return;
    }
    if (!dragging && !treeContext.showingTree) {
      treeContext.setShowingTree(true);
      setShowTree(true);
    }
    setDragging(false);
  };

  const actualTree = treeProgress.size;

  const onLoadTree = () => {
    setShowPlate(true);
  };

  return (
    <ViroARScene
      onAnchorFound={(anchor: unknown) => {
        console.log('New Anchor found', anchor);
        setPause(true);
      }}
      // onAnchorUpdated={(anchor: unknown) => console.log('Anchor updated', anchor)}
    >
      <ViroAmbientLight color='#FFFFFF' />

      <ViroDirectionalLight direction={[0, -1, -1]} influenceBitMask={3} intensity={3000} />

      <ViroARPlane key='Plane' pauseUpdates={pause}>
        <ViroNode
          position={[0, 0, 0]}
          onDrag={() => {}}
          animation={{ name: ViroStatics.Animations.ScaleTree, run: showPlate }}
          dragType='FixedToWorld'
          onClickState={onLogoClick}
          rotation={[0, treeContext.rotationY, 0]}>
          {!treeContext.showingTree && (
            <ViroBox
              position={[0, 0, 0]}
              scale={[0.004, 0.0001, 0.004]}
              materials={[ViroStatics.Materials.Logo]}
              animation={{ name: ViroStatics.Animations.ScaleLogo, run: true }}
              dragType='FixedToWorld'
            />
          )}
          {showTree && !treeProgress.loading && (
            <>
              <ViroSpotLight
                innerAngle={0}
                outerAngle={60}
                direction={[0, -1, 0]}
                position={[0, 3, 1]}
                color={'#ffffff'}
                castsShadow={true}
                influenceBitMask={2}
                shadowMapSize={2048}
                shadowNearZ={2}
                shadowFarZ={5}
                intensity={1000}
                shadowOpacity={0.6}
              />
              <ViroQuad
                rotation={[-90, 0, 0]}
                width={5.5}
                height={5.5}
                opacity={10}
                arShadowReceiver={true}
                lightReceivingBitMask={2}
              />
              {showPlate && (
                <>
                  <ViroBox
                    scale={[0.003, 0.06, 0.003]}
                    position={[0.075, 0.1, 0]}
                    materials={[ViroStatics.Materials.Plate]}
                    lightReceivingBitMask={3}
                    shadowCastingBitMask={2}
                  />
                  <Viro3DObject
                    // highAccuracyEvents={true}
                    source={require('./3D/models/plate/LogoPlate.obj')}
                    position={[-0.05, 0.05, 0]}
                    scale={[0.0225, 0.0225, 0.0225]}
                    type='OBJ'
                    materials={[ViroStatics.Materials.Gold, ViroStatics.Materials.PlateLogo]}
                    lightReceivingBitMask={3}
                    shadowCastingBitMask={2}
                  />
                </>
              )}
              {actualTree === 'SMALL' && <SmallTree onLoad={onLoadTree} {...treeProgress.objects} />}
              {actualTree === 'MID' && <MidTree onLoad={onLoadTree} {...treeProgress.objects} />}
              {actualTree === 'BIG' && (
                <>
                  {treeProgress.lantern && <Lantern />}
                  <BigTree onLoad={onLoadTree} {...treeProgress.objects} />
                </>
              )}
            </>
          )}
        </ViroNode>
      </ViroARPlane>
    </ViroARScene>
  );
};

const mainStyle = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

interface ARScreenshot {
  url: string;
  success: boolean;
}

export interface IARTreeSceneRef {
  screenshot: () => Promise<ARScreenshot>;
  rotate: (direction: 'LEFT' | 'RIGHT') => void;
  showingTree: () => boolean;
}

export interface IARTreeContext {
  rotationY: number;
  showingTree: boolean;
  setShowingTree: (showing: boolean) => void;
}

const Context = React.createContext<IARTreeContext>({} as IARTreeContext);

const useARTreeContext = () => useContext(Context);

export const ARTreeViroMain = React.forwardRef<IARTreeSceneRef, {}>((_, ref) => {
  const [rotationY, setRotationY] = useState(45 + 180);
  const [showingTree, setShowingTree] = useState(false);
  const viroRef = createRef<ViroARSceneNavigator>();
  const containerRef = createRef<View>();

  const refInit = (): IARTreeSceneRef => ({
    screenshot: () => {
      if (!viroRef.current) {
        throw new Error('No scene navigator into viroRef (ARTreeViroMain)');
      }

      const screenShotName = `pss-tree-${new Date().toISOString().replace(/:/g, '-').replace(/\./g, '_')}`;
      // @ts-ignore
      return viroRef.current.sceneNavigator.takeScreenshot(screenShotName, false);
    },
    rotate: (direction) => setRotationY((y) => y + 15 * (direction === 'LEFT' ? 1 : -1)),
    showingTree: () => showingTree,
  });

  useImperativeHandle(ref, refInit, [refInit]);

  return (
    <Context.Provider value={{ rotationY, showingTree, setShowingTree }}>
      <View collapsable={false} ref={containerRef} style={{ width: '100%', height: '100%', flex: 1 }}>
        <ViroARSceneNavigator
          key={'asdf1234'}
          ref={viroRef}
          autofocus={true}
          initialScene={{ scene: ARTreeViro }}
          style={mainStyle.scene}
        />
      </View>
    </Context.Provider>
  );
});
