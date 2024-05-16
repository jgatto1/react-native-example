import { Res, validateResponse } from 'model/backend';
import { Commitment, CommitmentRes, CommitmentsRes } from 'model/backend/commitment';
import { useSession } from 'providers/session/SessionProvider';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BackendClient } from 'service/backend-client.service';
import { useCohortTopic } from '../../CohortTopic.context';
import { showAlertIfNetworkError } from 'providers/error.alert';

export const NEW_COMMITMENT = 'My new commitment is:';
export const WHY_IS_IMPORTANT = 'Why is this commitment important?';
export const WHAT_CHALLENGES = 'What challenges may arise?';
export const HOW_TO_COPE_WITH_CHALLENGES = 'How will you cope with the challenges?';
export const HOW_YOU_FEEL_IF_COMPLETED = 'How will you feel if you complete the commitment?';

export declare type CommitmentUsedProps =
  | 'promise'
  | 'plan_a'
  | 'plan_b'
  | 'reason'
  | 'reward'
  | 'is_completed'
  | 'by_when'
  | 'id';
declare type CommitmentData = Pick<Commitment, CommitmentUsedProps>;

export interface CommitmentContext {
  commitmentData: CommitmentData;
  onCommitmentChange: (key: CommitmentUsedProps, value: string) => void;
  onCommitmentCreate: (isPublic: boolean) => void;
  onCommitmentComplete: () => Promise<any>;
  hasCommited: boolean;
  loading: boolean;
}

const INITIAL_CONTEXT = {
  commitmentData: {
    by_when: null,
    promise: '',
    plan_a: '',
    plan_b: '',
    reason: '',
    reward: '',
    is_completed: false,
  },
  hasCommited: false,
  loading: false,
};

const Context = createContext<CommitmentContext>(INITIAL_CONTEXT as CommitmentContext);

export const useCommitmentContext = () => useContext<CommitmentContext>(Context);

const getCommitments = async (topicId: number, userId: string): Promise<Commitment[]> => {
  const commitments = await BackendClient.get<CommitmentsRes>(`commitments?topic_id=${topicId}&user_uuid=${userId}`)
    .then(validateResponse)
    .then((res) => res.commitments)
    .catch((err) => {
      console.error('Something went wrong fetching commitments: ', err);
      return [];
    });
  return commitments;
};

const buildCommitmentPost = (commitmentData: CommitmentData) => {
  const { promise, plan_a, plan_b, reason, reward } = commitmentData;
  return (
    NEW_COMMITMENT +
    '\n' +
    promise +
    '\n\n' +
    WHY_IS_IMPORTANT +
    '\n' +
    plan_a +
    '\n\n' +
    WHAT_CHALLENGES +
    '\n' +
    plan_b +
    '\n\n' +
    HOW_TO_COPE_WITH_CHALLENGES +
    '\n' +
    reason +
    '\n\n' +
    HOW_YOU_FEEL_IF_COMPLETED +
    '\n' +
    reward
  );
};

const createCommitment = async (
  isPublic: boolean,
  newCommitment: CommitmentData & { topic_id: number }
): Promise<CommitmentData> => {
  return await BackendClient.post<CommitmentRes>('/commitment/create', {
    ...newCommitment,
    origin: 'Weekly Commitment',
  })
    .then(validateResponse)
    .then(async (res) => {
      const { id, by_when, promise, plan_a, plan_b, reason, reward, is_completed } = res.commitment;
      const message = buildCommitmentPost(res.commitment);
      await BackendClient.post<Res>('/msp_post/create', {
        resource_data: message,
        is_public: `${!!isPublic}`,
        origin: 'Weekly Commitment',
      });
      return { id, by_when, promise, plan_a, plan_b, reason, reward, is_completed };
    })
    .catch((err) => {
      showAlertIfNetworkError(err);
      console.error('Something went wrong when creating a commitment: ', err);
      // TODO: define wht to do in this case.
      return newCommitment;
    });
};

const completeCommitment = async (commitmentId: number): Promise<CommitmentData | void> => {
  return await BackendClient.put<CommitmentRes>(`commitment/${commitmentId}`, {
    is_completed: true,
  })
    .then(validateResponse)
    .then((res) => res.commitment);
};

export const CommitmentContextProvider: React.FC = ({ children }) => {
  const [commitmentData, setCommitmentData] = useState<CommitmentData>({
    ...(INITIAL_CONTEXT.commitmentData as CommitmentData),
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [hasCommited, setHasCommited] = useState(false);

  const session = useSession();
  const { currentEvent } = useCohortTopic();
  useEffect(() => {
    const userId = session.data?.user.uuid;
    const topicId = currentEvent.topic?.id;
    if (topicId && userId) {
      setLoading(true);
      getCommitments(topicId, userId)
        .then((commitments) => {
          if (commitments?.length) {
            setCommitmentData(commitments[0]);
            setHasCommited(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('error fetching commitments: ', err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = (isPublic: boolean) => {
    setLoading(true);
    createCommitment(isPublic, { ...commitmentData, topic_id: currentEvent.topic.id }).then((res: CommitmentData) => {
      setCommitmentData(res);
      setHasCommited(true);
      setLoading(false);
    });
  };

  const onChange = (key: CommitmentUsedProps, value: string) => {
    setCommitmentData({
      ...commitmentData,
      [key]: value,
    });
  };

  const onComplete = async (): Promise<any> => {
    return completeCommitment(commitmentData.id)
      .then((commitment) => setCommitmentData(commitment as CommitmentData))
      .catch((err) => console.error('Something went wrong on commitment complete: ', err));
  };

  const value = {
    loading,
    hasCommited,
    commitmentData,
    onCommitmentChange: (key: CommitmentUsedProps, newValue: string) => onChange(key, newValue),
    onCommitmentCreate: (isPublic: boolean) => onCreate(isPublic),
    onCommitmentComplete: () => onComplete(),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
