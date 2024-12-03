import { httpClient } from '@/components/api';

// Fetch single question by ID
export const fetchQuestion = async (id: string) => {
  try {
    const response = await httpClient.get(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question with ID ${id}:`, error);
    throw error;
  }
};

// // Fetch answers for a question
// export const fetchAnswers = async (questionId: string) => {
//   try {
//     const response = await httpClient.get(`/questions/${questionId}/answers`);
//     return response.data;
//   } catch (error) {
//     console.error(
//       `Error fetching answers for question ID ${questionId}:`,
//       error,
//     );
//     throw error;
//   }
// };

// // Fetch user
// export const fetchUser = async (userId: string) => {
//   const response = await fetch(`/user/profile?id=${userId}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch user details');
//   }
//   return response.json();
// };

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
