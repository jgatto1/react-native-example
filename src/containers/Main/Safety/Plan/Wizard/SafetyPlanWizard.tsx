import React, { createRef, useState } from 'react';
import { useSafetyPlanWizardStyles } from './SafetyPlanWizard.styles';
import { Swiper, SwiperProps } from 'components';
import { SwiperRef } from 'components/Swiper/Swiper';
import { View } from 'react-native';
import { SafetyPlanWizardStep, StepType } from 'containers/Main/Safety/Plan/Wizard/Step/SafetyPlanWizardStep';
import { SafetyPlan, SafetyPlanUpdateReq } from 'model/backend/safety';
import { SafetyPlanWizardEnd } from 'containers/Main/Safety/Plan/Wizard/End/SafetyPlanWizardEnd';
import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { useSafetyPlan } from 'containers/Main/Safety/Plan/SafetyPlan.context';

const STEPS = [
  {
    type: StepType.MILD,
    title: "Mild Danger is when you're starting to show distress.\nWhat are your signs (red flags) for Mild Danger",
    subtitle: 'Examples: eating poorly, missing treatment sessions, decreased motivation',
  },
  {
    type: StepType.COPING,
    title: "When you're experiencing, and you're in Mild Danger.",
    subtitle: "List safe coping to try when you're in Mild Danger",
  },
  {
    type: StepType.MODERATE,
    title:
      "Moderate Danger is when you're having some major problems.\nWhat are your signs (red flags) for Moderate Danger?",
    subtitle:
      'Examples: isolation, lying, not taking medications, becoming physically ill, verbal fights, not going to work or school',
  },
  {
    type: StepType.COPING,
    title: "When you're experiencing, and you're in Moderate Danger.",
    subtitle: "List safe coping to try when you're in Moderate Danger",
  },
  {
    type: StepType.SERIOUS,
    title: 'Serious Danger means an extremely unsafe situation.\nWhat are your signs (red flags) for Serious Danger',
    subtitle: 'Examples: physically hurting yourself or others, being physically hurt by someone, overdose, giving up',
  },
  {
    type: StepType.COPING,
    title: "When you're experiencing, and you're in Serious Danger.",
    subtitle: "List safe coping to try when you're in Serious Danger",
  },
];

export const SafetyPlanWizard: React.VFC = () => {
  const styles = useSafetyPlanWizardStyles();
  const swiper = createRef<SwiperRef>();
  const plansContext = useSafetyPlan();

  const [plans, setPlans] = useState<SafetyPlan[]>([]);

  const [updating, setUpdating] = useState(false);

  const updatePlan = (updatePlans: SafetyPlan[]) => {
    const body: SafetyPlanUpdateReq = {
      data: {
        safety_plan: updatePlans,
      },
    };
    setUpdating(true);
    BackendClient.put<Res>('/safety_plan', body)
      .then(validateResponse)
      .then(() => plansContext.update(updatePlans))
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => setUpdating(false));
  };

  const onContinue = (step: number) => (plan: SafetyPlan) => {
    let updatePlans = [...plans];
    if (updatePlans[plan.id]) {
      updatePlans[plan.id] = plan;
    } else {
      updatePlans = [...plans, plan];
    }
    setPlans(updatePlans);
    if (step === STEPS.length - 1) {
      updatePlan(updatePlans);
    }
    swiper.current?.goTo(step + 1);
  };

  const swiperData: SwiperProps = {
    showPagination: true,
    onFinish: () => console.debug('Finish'),
    indicatorsPos: 'top',
    hideBottomBar: true,
    data: [
      ...STEPS.map((opts, step) => (
        <SafetyPlanWizardStep
          onBack={() => swiper.current?.goTo(step - 1)}
          onContinue={onContinue(step)}
          step={step + 1}
          {...opts}
        />
      )),
      <SafetyPlanWizardEnd
        onBack={() => swiper.current?.goTo(STEPS.length - 1)}
        step={STEPS.length + 1}
        updating={updating}
      />,
    ],
  };

  return (
    <View style={styles.root}>
      <Swiper ref={swiper} {...swiperData} />
    </View>
  );
};
