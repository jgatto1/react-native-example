import { PowerUp } from 'model/backend/quiz';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSession } from 'providers/session/SessionProvider';
import { F, isErrorRes, Res } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';
import { useCohortTopic } from 'containers/Main/Home/CohortTopic.context';

interface WeeklyPowerUpsContext {
  powerUp?: PowerUp;
  noMore?: boolean;
  refresh?: () => void;
}

const Context = React.createContext<WeeklyPowerUpsContext>({});

export const useWeeklyPowerUpsContext = () => useContext(Context);

export const WeeklyPowerUpsContextProvider: React.FC = ({ children }) => {
  const session = useSession();
  const { currentEvent } = useCohortTopic();
  const topic = currentEvent.topic;

  const [powerUp, setPowerUp] = useState<PowerUp>();
  const [noMore, setNoMore] = useState(false);

  const refresh = useCallback(() => {
    const params = {
      topic_id: topic.id,
      user_uuid: session.data?.user.uuid || 'dc27720c-b99f-11eb-b0b9-16e2a3977c87',
      has_tried_id: false,
      is_not_interested: false,
    };
    BackendClient.get<Res<F<'power_ups', PowerUp[]>>>('/power_ups', { params })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (isErrorRes(data)) {
          throw new Error('Cannot fetch power ups');
        }
        if (!data?.power_ups || !data.power_ups.length) {
          setNoMore(true);
        } else {
          setPowerUp(data.power_ups[0]);
        }
      })
      .catch((err) => {
        console.error('Error on power ups', err);
      });
  }, [topic, session.data?.user.uuid]);

  useEffect(() => refresh(), [refresh]);

  const value = { powerUp, noMore, refresh };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
