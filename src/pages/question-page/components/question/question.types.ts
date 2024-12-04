export type Author = {
  id: number;
  fullname: string;
  email: string;
  rating: number;
};

type Question = {
  id: number;
  author_id: string;
  title: string;
  description: string;
  tags: string[];
  created_at: string;
};

export type QuestionProps = {
  question: Question;
};
