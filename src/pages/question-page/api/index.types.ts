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

export type Answers = Answer[];

export type Question = {
  id: number;
  author_id: number;
  title: string;
  description: string;
  tags: string[];
  created_at: string;
  answers: Answer[];
};

export type UserProfile = {
  id: number;
  fullname: string;
  email: string;
  rating: number;
  questions: Array<{
    id: number;
    title: string;
    description: string;
    tag_names: string;
    author: {
      id: number;
      fullname: string;
      email: string;
      rating: number;
    };
    answers: Array<{
      id: number;
      text: string;
      likes_count: number;
      is_correct: boolean;
      author: {
        id: number;
        fullname: string;
        email: string;
        rating: number;
      };
    }>;
    answers_count: string;
    created_at: string;
    has_correct_answer: string;
  }>;
  answers: Array<{
    id: number;
    text: string;
    likes_count: number;
    is_correct: boolean;
    author: {
      id: number;
      fullname: string;
      email: string;
      rating: number;
    };
  }>;
};
