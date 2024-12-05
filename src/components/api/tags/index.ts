import { httpClient } from '..';

export const getTags = async () => {
  try {
    const response = await httpClient.get('/tags');
    return response.data;
  } catch (error) {
    console.error('Error during get tags:', error);
    throw error;
  }
};
