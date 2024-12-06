export type Answer = {
  id: number;
  text: string;
  likes_count: number;
  is_correct: boolean;
  authors_of_likes: number[];
  author: {
    id: number;
    fullname: string;
    email: string;
    rating: number;
  };
};

export type AnswersProps = {
  answers: Answer[];
  questionAuthorId: number;
};

export type ExtendedAnswer = Answer & {
  questionAuthorId: number;
};
