import { SafetyPlan, SafetyPlanRes } from 'model/backend/safety';
import React, { useContext, useEffect, useState } from 'react';
import { validateResponse } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';

export enum Select {
  MILD = 'Mild',
  MODERATE = 'Moderate',
  SERIOUS = 'Serious',
}

interface IPlanContainer {
  flag: SafetyPlan;
  coping: SafetyPlan;
}

interface ISafetyPlans {
  [Select.MILD]?: IPlanContainer;
  [Select.MODERATE]?: IPlanContainer;
  [Select.SERIOUS]?: IPlanContainer;
}

interface ISafetyPlan {
  plans: ISafetyPlans;
  selected?: { key: Select; value?: IPlanContainer };
  select: (select: Select) => void;
  loading?: boolean;
  update: (plans: SafetyPlan[]) => void;
}

const Context = React.createContext<ISafetyPlan | undefined>(undefined);

export const useSafetyPlan = (): ISafetyPlan => {
  const throwError = (): ISafetyPlan => {
    throw new Error('No context for Safety Plan');
  };
  return (useContext(Context) as ISafetyPlan) || throwError();
};

export const SafetyPlanContextProvider: React.FC = ({ children }) => {
  const [plans, setPlans] = useState<ISafetyPlans>({});
  const [selected, setSelected] = useState<Select>();
  const [loading, setLoading] = useState(true);

  const convertAndSetPlans = (plansRes: SafetyPlan[]) => {
    setPlans({
      [Select.MILD]: {
        flag: plansRes[0],
        coping: plansRes[1],
      },
      [Select.MODERATE]: {
        flag: plansRes[2],
        coping: plansRes[3],
      },
      [Select.SERIOUS]: {
        flag: plansRes[4],
        coping: plansRes[5],
      },
    });
  };

  useEffect(() => {
    // mockOkReq(PLANS)
    BackendClient.get<SafetyPlanRes>('/safety_plan')
      .then(validateResponse)
      .then((data) => data.safety_plan.data.safety_plan)
      .then(convertAndSetPlans)
      .catch((err) => {
        console.warn('Cannot fetch plans', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const value: ISafetyPlan = {
    update: (newPlans: SafetyPlan[]) => convertAndSetPlans(newPlans),
    loading,
    plans,
    selected: selected && { key: selected, value: plans[selected] },
    select: (select) => setSelected(select),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
