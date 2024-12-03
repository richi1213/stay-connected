import { httpClient } from '..';

export const getUsers = async () => {
  try {
    const response = await httpClient.get('/user/leaderboard');
    console.log('get users was successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during get users:', error);
    throw error;
  }
};
