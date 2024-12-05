import { Question, UserProfile } from '@/pages/question-page/api/index.types';

export type QuestionProps = {
  question: Question;
  author: UserProfile;
};
