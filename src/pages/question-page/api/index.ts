import { httpClient } from '@/components/api';
import {
  Answers,
  Question,
  UserProfile,
} from '@/pages/question-page/api/index.types';

export const fetchQuestion = async (id: number): Promise<Question> => {
  try {
    const response = await httpClient.get<Question>(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question with ID ${id}:`, error);
    throw error;
  }
};

export const fetchUserProfile = async (id: number): Promise<UserProfile> => {
  try {
    const response = await httpClient.get(`/user/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile with ID ${id}:`, error);
    throw error;
  }
};

export const fetchAnswers = async (questionId: number): Promise<Answers> => {
  try {
    const response = await httpClient.get<Answers>(
      `/questions/${questionId}/answers`,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching answers for question ID ${questionId}:`,
      error,
    );
    throw error;
  }
};

export const toggleAnswerLike = async (answerId: number): Promise<void> => {
  try {
    const response = await httpClient.patch(`/answers/${answerId}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling like for answer ID ${answerId}:`, error);
    throw error;
  }
};

export const markAnswerAsCorrect = async (answerId: number): Promise<void> => {
  try {
    const response = await httpClient.patch(`/answers/${answerId}/correct`);
    return response.data;
  } catch (error) {
    console.error(`Error marking answer ID ${answerId} as correct:`, error);
    throw error;
  }
};

export const postAnswer = async ({
  questionId,
  answerData,
}: {
  questionId: string;
  answerData: { text: string };
}) => {
  try {
    const response = await httpClient.post(
      `/questions/${questionId}/answers`,
      answerData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error posting answer for question ID ${questionId}:`, error);
    throw error;
  }
};
