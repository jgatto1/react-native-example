import React from 'react';
import { PowerUps } from 'components';
import { PowerUpType } from 'model/backend/quiz';

export const DailyActionQuestion: React.VFC = () => <PowerUps powerUpType={PowerUpType.QUEST} />;
