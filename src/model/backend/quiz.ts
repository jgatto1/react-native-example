import { F, Res } from 'model/backend/index';

export enum QuestionType {
  TRUE_FALSE = 'true_false',
  CATEGORIZE = 'categorize',
  MULTIPLE_CHOICE = 'multiple_choice',
  FILL_BLANK = 'fill_in_the_blank',
}

export interface Question {
  choices: string[];
  correct_choice_indexes: number[];
  id: number;
  label_a?: string | null;
  label_b?: string | null;
  question: string;
  quiz_id: number;
  responded_correctly?: boolean | null;
  text_if_correct: string;
  text_if_incorrect: string;
  type: QuestionType;
}

export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
  topic_id: number;
}

export declare type QuizzesRes = Res<F<'quizzes', Quiz[]>>;
export declare type QuestionRespondRes = Res<F<'question', Question>>;

export enum PowerUpType {
  QUEST = 'quest',
  POWER_UP = 'power_up',
}

export interface PowerUp {
  id: number;
  text_one: string;
  text_two: string;
  topic_id: number;
  type: PowerUpType;
}
