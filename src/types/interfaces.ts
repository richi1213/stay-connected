export interface Answer {
  id: string;
  question_id: number;
  description: string;
  author: string;
  is_correct: boolean;
  date: string;
  text: string;
  likes_count: number;
}
export interface Question {
  id: string;
  author: Author;
  title: string;
  description: string;
  tag_names: string[];
  created_at: string;
  answers: Answer[];
}
export interface Author {
  id: string;
  fullname: string;
  email: string;
  rating: number;
  questions: Question[];
}
export interface User {
  id: string;
  fullname: string;
  email: string;
  rating: number;
  questions: Question[];
  answers: Answer[];
}
