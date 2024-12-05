import { httpClient } from '..';

export type RefreshPayload = {
  payload: {
    refresh: string;
  };
};

export const refresh = ({ payload }: RefreshPayload) => {
  return httpClient
    .post('/api/token/refresh/', payload)
    .then((res) => res.data);
};

// import { httpClient } from '..';

// export const getUserInfo = async () => {
//   try {
//     const response = await httpClient.get('/user/profile/');
//     console.log('fetched user data', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user info:', error);
//     throw error;
//   }
// };
