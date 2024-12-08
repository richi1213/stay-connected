import { useAtom, useAtomValue } from 'jotai';
import MainRoutes from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { meAtom, userAtom } from './store/auth';
import { setAuthToken } from './components/api';
import { useEffect } from 'react';
import { getUserInfo } from './components/api/user/getuserinfo';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [me, setMe] = useAtom(meAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAuthToken(parsedUser.access);
      } catch (error) {
        setAuthToken(null);
      }
    }
  }, [me]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo();
        setMe(res);
      } catch (error) {
        setMe(null);
        setAuthToken(null);
        localStorage.removeItem('user');
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
