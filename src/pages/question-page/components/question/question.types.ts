export type Author = {
  id: string;
  fullname: string;
  email: string;
  rating: number;
};

type Question = {
  id: string;
  author_id: string;
  title: string;
  description: string;
  tags: string[];
  created_at: string;
};

export type QuestionProps = {
  question: Question;
};
