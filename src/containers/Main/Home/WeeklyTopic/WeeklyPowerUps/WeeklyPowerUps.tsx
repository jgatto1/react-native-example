import { PowerUps } from 'components';
import { PowerUpType } from 'model/backend/quiz';
import React from 'react';

export const PowerUp = () => {
  return <PowerUps powerUpType={PowerUpType.POWER_UP} />;
};
