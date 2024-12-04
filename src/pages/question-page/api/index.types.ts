export type Answer = {
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
};

export type Answers = Answer[];
