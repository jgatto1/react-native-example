import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { TriggerRoutes } from 'containers/Main/Trigger/Trigger.routes';
import { MainTabRoutes } from 'containers/Main/MainTabRoutes';

export interface SafetyBoomerangLink {
  label: string;
  route: string;
  params?: { [key: string]: unknown };
}

export const LINKS: SafetyBoomerangLink[] = [
  { label: 'Go to Reach Out main menu', route: MainTabRoutes.REACH_OUT, params: { screen: ReachOutRoutes.MENU } },
  {
    label: 'Go to Daily Reflections',
    route: TriggerRoutes.DAILY_ACTIONS,
    params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.REFLECTION } },
  },
  { label: 'Contact your Trusted People', route: TriggerRoutes.TRUSTED_PEOPLE },
  { label: 'Message a Coach', route: TriggerRoutes.COPING_COACH },
  { label: 'Reach out to Group Members', route: TriggerRoutes.MESSAGES },
  { label: 'Go to Safety main menu', route: SafetyRoutes.MENU },
  {
    label: 'Do a Safety Check In',
    route: TriggerRoutes.DAILY_ACTIONS,
    params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.CHECK } },
  },
  { label: 'Make a Safety Plan', route: TriggerRoutes.PLAN },
];

export const LINKS_HASH = LINKS.map((link) => ({ [link.label]: link })).reduce((acc, act) => ({ ...acc, ...act }), {});
