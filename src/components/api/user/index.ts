import { httpClient } from '..';

// Define the data to be sent in the request body
export const registerUser = async (userData: {
  fullname: string;
  password: string;
  email: string;
}) => {
  try {
    const response = await httpClient.post('/user/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const LoginUser = async (userData: {
  password: string;
  email: string;
}) => {
  try {
    const response = await httpClient.post('/api/token/', userData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
