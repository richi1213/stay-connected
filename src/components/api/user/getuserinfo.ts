import { httpClient } from '..';

export const getUserInfo = async () => {
  try {
    const response = await httpClient.get('/user/profile/');
    return response.data;
  } catch (error) {
    throw error;
  }
};
//სხვისი პროფილი
export const getUserProfile = async (id: string) => {
  try {
    const response = await httpClient.get(`/user/profile/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
