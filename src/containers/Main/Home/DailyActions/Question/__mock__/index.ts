import { PowerUp, PowerUpType } from 'model/backend/quiz';
import { F, Res } from 'model/backend';

export const POWER_UPS: PowerUp[] = [
  {
    id: 230,
    text_one: 'Do you "beat yourself up" after using?',
    text_two: 'Think about how that prevents you from growing. How does "beating yourself up" not work?',
    topic_id: 30,
    type: PowerUpType.QUEST,
  },
];

export const POWER_UPS_RES: { data: Res<F<'power_ups', PowerUp[]>> } = {
  data: {
    error: undefined,
    power_ups: POWER_UPS,
    status: 'ok',
  },
};
