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
