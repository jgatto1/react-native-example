import React, { useContext, useEffect, useState } from 'react';
import { ProgressTreeRes } from 'model/backend/progress';
import { validateResponse } from 'model/backend';
import { EnabledFeaturesRes } from 'model/backend/safety';
import { TreeProps } from 'containers/Main/Home/AR/ARCamera/ARTreeViro/3D/model';
import { BackendClient } from 'service/backend-client.service';

declare type TreeFeatureName = 'tree_butterflies' | 'tree_flowers' | 'tree_fruit' | 'tree_leaves' | 'tree_lantern';

const TREE_FEATURES: Set<TreeFeatureName> = new Set([
  'tree_butterflies',
  'tree_flowers',
  'tree_fruit',
  'tree_leaves',
  'tree_lantern',
]);

type TreeEnabledFeatures = {
  [key in TreeFeatureName]: boolean;
};

export declare type TreeSize = 'SMALL' | 'MID' | 'BIG';

interface ITreeProgress {
  loading?: boolean;
  size: TreeSize;
  lantern: boolean;
  objects: TreeProps;
}

type ITreeProgressContext = ITreeProgress & { loadContext: () => void };

const Context = React.createContext<ITreeProgressContext>({} as ITreeProgressContext);

export const useTreeProgressContext = () => useContext(Context);

async function fetchProgress(): Promise<ITreeProgress> {
  const progress = await BackendClient.get<ProgressTreeRes>('/progress/tree')
    .then(validateResponse)
    .then((res) => res.progress_tree);

  const enabledFeatures = await BackendClient.get<EnabledFeaturesRes>('/enabled_features')
    .then(validateResponse)
    .then(
      ({ enabled_features }) =>
        new Set(enabled_features.map((f) => f.enabled_feature).filter((f) => TREE_FEATURES.has(f as TreeFeatureName)))
    )
    .then((enabledSet) => {
      return Array.from(TREE_FEATURES).reduce(
        (acc, act) => ({ ...acc, [act]: enabledSet.has(act) }),
        {}
      ) as TreeEnabledFeatures;
    });

  const size: TreeSize = progress.size === 'big' ? 'BIG' : progress.size === 'mid' ? 'MID' : 'SMALL';
  return {
    size,
    lantern: enabledFeatures.tree_lantern && progress.lantern,
    objects: {
      leaves: enabledFeatures.tree_leaves ? progress.leaves : undefined,
      /**
       * New Formula:
       * One Additional Butterfly is earned if at least 10 PUBLIC OR PRIVATE [private=safe place] posts are made per calendar week.
       * Two Additional Butterfly is earned if at least 20 PUBLIC OR PRIVATE [private=safe place] posts are made per calendar week.
       * If more than 20 public posts are made per calendar week, it will always count just 20 [max of 2 butterflies in any one week]
       */
      butterflies: enabledFeatures.tree_butterflies ? progress.butterflies : undefined,
      /**
       * D- Safety Surprises: Historical Accumulated Quantity, adds 1 if does 3 in a week [cap of 2]
       * E- Safety Plan Check: Historical Accumulated Quantity, adds 2 if does 4 in a week [cap of 2]
       * F- Safety Boomerang: Historical Accumulated Quantity, adds 1 if does 2 in a week [cap of 1]
       * G= Log a Trigger: adds 1
       * H- Talk to safe Self: If at least one (Audio, Photo, Reflection), adds 1
       * I- Safe / Unsafe Picture: If at least one picture loaded, adds 1
       */
      flowers: enabledFeatures.tree_flowers ? progress.flowers : undefined,
      /**
       * Variables:
       * Weekly Commitment:
       * Weekly Power Up:
       * Daily Quiz:
       * New Formula Variables:
       *
       * each week they earn up to 3 fruits by doing 12  activities of any of the above activities, they earn 3 fruits [takes 4 weeks to earn all 12 fruits]
       * if they do 12 activs, they earn 3 fruits
       * if they do 6 they earn 2 fruits
       * if they do 3 they earn 1 fruits
       */
      fruits: enabledFeatures.tree_fruit ? progress.fruits : undefined,
    },
  };
}

export const TreeProgressContextProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState<ITreeProgress>({
    loading: true,
    size: 'SMALL',
    objects: {},
    lantern: false,
  });

  const loadContext = async () => {
    fetchProgress()
      .then((progress) => {
        setValue(progress);
      })
      .catch((err) => {
        console.warn('Cannot fetch tree progress', err);
      });
  };

  useEffect(() => {
    loadContext().catch((err) => {
      console.warn('Erro while fetching tree progress', err);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadContext().catch((err) => {
        console.warn('Erro while polling tree progress', err);
      });
    }, 1000 * 15); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  return <Context.Provider value={{ ...value, loadContext }}>{children}</Context.Provider>;
};
