export interface Answer {
  id: string;
  questionId: string;
  description: string;
  author: string;
  isCorrect: boolean;
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
