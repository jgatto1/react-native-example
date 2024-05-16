import React, { useState } from 'react';

import { SMALLTREE_REQUIRES } from './models/small/SmallTree.require';
import { ViroNode } from '@viro-community/react-viro';
import { BIGTREE_REQUIRES } from './models/big/BigTree.require';
import { MIDTREE_REQUIRES } from './models/middle/MidTree.require';
import { CommonViroObject } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/components/CommonViroObject';
import { CommonViroObjects } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/components/CommonViroObjects';
import { ModelRequires, TreeFactory, TreeFactoryProps } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/model';

const objectsWhichStartWith = (requires: ModelRequires, letter: string) => {
  return Object.entries(requires)
    .filter(([k]) => k.startsWith(letter))
    .map(([, v]) => v);
};

const treeViroComponentFactory: TreeFactory =
  (elements) =>
  ({ onLoad, flowers, fruits, leaves, butterflies }) => {
    const [renderDecos, setRenderDecos] = useState(false);

    const onLoadBase = () => {
      onLoad && onLoad();
      setRenderDecos(true);
    };
    return (
      <>
        <CommonViroObject onLoad={onLoadBase} {...elements.tree} />
        {renderDecos && (
          <>
            <CommonViroObjects elements={elements.flowers} amount={flowers} />
            <CommonViroObjects elements={elements.fruits} amount={fruits} />
            <CommonViroObjects elements={elements.leaves} amount={leaves} />
            <ViroNode>
              <CommonViroObjects elements={elements.butterflies} amount={butterflies} />
            </ViroNode>
          </>
        )}
      </>
    );
  };

const requiresFactory = (requires: ModelRequires): TreeFactoryProps => ({
  tree: requires.TREE,
  flowers: objectsWhichStartWith(requires, 'F'),
  fruits: objectsWhichStartWith(requires, 'C'),
  leaves: objectsWhichStartWith(requires, 'L'),
  butterflies: objectsWhichStartWith(requires, 'B'),
});

export const SmallTree = treeViroComponentFactory(requiresFactory(SMALLTREE_REQUIRES));
export const MidTree = treeViroComponentFactory(requiresFactory(MIDTREE_REQUIRES));
export const BigTree = treeViroComponentFactory(requiresFactory(BIGTREE_REQUIRES));
