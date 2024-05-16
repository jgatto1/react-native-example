import { Platform, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTree3DViewStyles } from './Tree3DView.styles';
import { Tree3DViewContextProvider, useTree3DViewContext } from 'containers/Main/Home/Tree3DView/Tree3DView.context';
import { HomeRoutes } from 'containers/Main/Home/Home.stack.routes';
import { HomeARRoutes } from 'containers/Main/Home/AR/HomeAR.routes';
import { SVG as ArSVG } from 'containers/Main/Home/AR/assets';
import { SVG as ArCameraSVG } from 'containers/Main/Home/AR/ARCamera/assets';
import { useNavigation } from '@react-navigation/native';
import { Viro3DTreeViewHome } from 'containers/Main/Home/Tree3DView/Viro3DTreeView';
import { useARSupportedContext } from 'providers/ar/support-ar.context';

export const Tree3DView: React.VFC = () => {
  return (
    <Tree3DViewContextProvider>
      <Tree3DViewInner />
    </Tree3DViewContextProvider>
  );
};

const Tree3DViewInner: React.VFC = () => {
  const navigation = useNavigation();
  const styles = useTree3DViewStyles();
  const tree3D = useTree3DViewContext();
  const arSupport = useARSupportedContext();

  const gotToARTree = () => {
    navigation.navigate(HomeRoutes.AR_TREE);
  };

  const goToARTreeCamera = () => {
    // navigation.navigate(HomeARRoutes.CAMERA);
    navigation.navigate(HomeRoutes.AR_TREE, { screen: HomeARRoutes.CAMERA });
  };

  const [reloadTree, setReloadTree] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      return;
    }
    return navigation.addListener('focus', () => {
      setTimeout(() => {
        setReloadTree(true);
        setTimeout(() => setReloadTree(false), 100);
      }, 500);
    });
  }, [navigation]);

  return (
    <Pressable style={styles.arContainer} onPress={gotToARTree}>
      <View style={styles.arTreeProgress}>{!reloadTree && <Viro3DTreeViewHome />}</View>
      <Pressable
        onPress={() => navigation.navigate(HomeRoutes.AR_TREE)}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      {arSupport.support === 'YES' && (
        <Pressable style={styles.arButton} onPress={goToARTreeCamera}>
          <ArSVG.ARButton width={30} height={30} fill={styles.arButtonSVG.color} />
        </Pressable>
      )}
      <Pressable style={[styles.arButtonRotate, styles.arButtonRotateLeft]} onPress={() => tree3D.rotate('LEFT')}>
        <ArCameraSVG.Rotate width={35} height={35} fill={styles.arButtonSVG.color} />
      </Pressable>
      <Pressable style={[styles.arButtonRotate, styles.arButtonRotateRight]} onPress={() => tree3D.rotate('RIGHT')}>
        <ArCameraSVG.Rotate width={35} height={35} fill={styles.arButtonSVG.color} />
      </Pressable>
    </Pressable>
  );
};
