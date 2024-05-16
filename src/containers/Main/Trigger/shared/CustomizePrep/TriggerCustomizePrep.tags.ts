import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';
import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { SafetyPlanRoutes } from 'containers/Main/Safety/Plan/SafetyPlan.routes';
import { LearnRoutesStatic } from 'containers/Main/Learn/Learn.routes';
import { TriggerRoutes } from 'containers/Main/Trigger/Trigger.routes';

export const DEFAULT = [
  'Loneliness',
  'My partner',
  'My job',
  'My body',
  'The news',
  'Boredom',
  'Stress',
  'Family Issues',
  'Isolation',
  'Rejection',
  'My child',
  'Anger',
];

export const COMMON = [...DEFAULT];

export const TRAUMA = [
  'Memories',
  'Loud sounds',
  'Sex',
  'Body sensation',
  'Movies',
  'Yelling',
  'See perpetrator',
  'Smells',
  'Harassment',
];

export const ADDICTION = [
  'See alcohol/drug',
  'Celebration',
  'Shame',
  'Craving',
  'Overconfidence',
  'Anxiety',
  'Having money',
  'Food',
  'Sadness',
];

export const LIFE = [
  'Money problems',
  'Caretaking',
  'Too much to do',
  'Illness',
  'Loss',
  'Lack of support',
  'Lack of sleep',
  'Feel criticized',
  'Failing at work',
];

export const RELATIONSHIP = [
  'Conflict',
  'My friend(s)',
  'Trust issue',
  'Jealousy',
  'My boss',
  'Boundaries',
  'Unsafe person',
  'Disappointment',
  'Worry',
];

export interface LabeledTags {
  label: string;
  labelTags: string[];
}

export const LABELED: LabeledTags[] = [
  { label: 'Common', labelTags: DEFAULT },
  { label: 'Trauma Related', labelTags: TRAUMA },
  { label: 'Addiction Related', labelTags: ADDICTION },
  { label: 'Life Related', labelTags: LIFE },
  { label: 'Relationship Situation', labelTags: RELATIONSHIP },
];

export interface TriggerAction {
  label: string;
  route: string;
  params?: object;
  external?: boolean;
}

export interface TriggerActions {
  title: string;
  items: TriggerAction[];
}

export const ACTIONS: TriggerActions[] = [
  {
    title: 'Resources',
    items: [
      { label: 'Call a crisis hotline', route: LearnRoutesStatic.URGENT_RESOURCES },
      {
        label: 'Use a blood alcohol calculator',
        route: 'https://www.calculator.net/bac-calculator.html',
        external: true,
      },
    ],
  },
  {
    title: 'Reach out',
    items: [
      {
        label: 'Go to Daily Reflections',
        route: TriggerRoutes.DAILY_ACTIONS,
        params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.REFLECTION } },
      },
      { label: 'Contact your Trusted People', route: ReachOutRoutes.TRUSTED_PEOPLE },
      { label: 'Message a Coach', route: ReachOutRoutes.COPING_COACH },
      { label: 'Reach out to Group Members', route: ReachOutRoutes.MESSAGES },
    ],
  },
  {
    title: 'Safety',
    items: [
      {
        label: 'Do a Safety Check in',
        route: TriggerRoutes.DAILY_ACTIONS,
        params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.CHECK } },
      },
      { label: 'Make a Safety Plan', route: SafetyPlanRoutes.MENU },
      { label: 'Return to the Safety Menu', route: SafetyRoutes.MENU },
    ],
  },
];
