export interface Answer {
  id: string;
  questionId: string;
  description: string;
  author: string;
  isCorrect: boolean;
  date: string;
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
