import { Question, QuizzesRes } from 'model/backend/quiz';
import React, { useContext, useEffect, useState } from 'react';
import { validateResponse } from 'model/backend';
// import { useDailyActions } from 'containers/Main/Home/DailyActions/DailyActions.context';
import { BackendClient } from 'service/backend-client.service';
import { useCohortTopic } from 'containers/Main/Home/CohortTopic.context';
import { WeeklyTopicRoutes } from 'containers/Main/Home/WeeklyTopic/WeeklyTopic.stack.routes';

export interface QuizContext {
  menu: string;
  refresh: () => void;
  questions?: Question[];
  update: (question: Question) => void;
  completed: boolean;
  answered?: number;
}

const Context = React.createContext<QuizContext>({
  menu: '',
  completed: false,
  update: () => null,
  refresh: () => null,
  questions: [],
  answered: 0,
});

function loadQuestions(topicId: number): Promise<Question[]> {
  // return mockOkReq({ quizzes: QUIZZES })
  return BackendClient.get<QuizzesRes>('/quizzes', { params: { topic_id: topicId } })
    .then(validateResponse)
    .then((res) => res.quizzes[0].questions?.map((q) => ({ ...q })));
}

export const useDailyActionQuiz = () => useContext(Context);

export const DailyActionQuizContextProvider: React.FC<{ menu?: string }> = ({ menu, children }) => {
  const [questions, setQuestions] = useState<Question[]>();
  const { currentEvent } = useCohortTopic();
  const topic = currentEvent.topic;

  useEffect(() => {
    loadQuestions(topic.id).then((q) => setQuestions(q));
  }, [topic]);

  const update = (updatedQuestion: Question) => {
    // TODO: Do BE Req
    const updatedQuestions = questions?.map((question) => {
      if (updatedQuestion.id === question.id) {
        return { ...question, ...updatedQuestion };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const answered = questions?.filter(({ responded_correctly }) => responded_correctly !== null).length;

  const quiz: QuizContext = {
    menu: menu || WeeklyTopicRoutes.MENU,
    refresh: () =>
      loadQuestions(topic.id)
        .then((q) => setQuestions(q))
        .catch((err) => console.warn('Cannot fetch questions', err)),
    questions,
    update,
    answered,
    completed: answered === questions?.length,
  };

  return <Context.Provider value={quiz}>{children}</Context.Provider>;
};
