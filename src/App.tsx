import { useAtomValue, useSetAtom } from 'jotai';
import MainRoutes from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { meAtom, userAtom } from './store/auth';
import { setAuthToken } from './components/api';
import { useEffect } from 'react';
import { getUserInfo } from './components/api/user/getuserinfo';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const setMe = useSetAtom(meAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user?.access) {
      setAuthToken(user.access);
    } else {
      setAuthToken(null);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo();
        setMe(res); // Assuming `res` is of the correct type for `setMe`
      } catch (error) {
        console.error('Error fetching user info:', error);
        setMe(null); // Or handle error state accordingly
      }
    };

    fetchData();
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <MainRoutes />
    </QueryClientProvider>
  );
};

export default App;
