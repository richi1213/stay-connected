import { httpClient } from '@/components/api';
import { userAtom } from '@/store/auth';
import { useAtomValue } from 'jotai';
import ScreenLg from '@/components/layout/page-containers/screen-lg';
import { useEffect, useState } from 'react';
import UserInfo from '../components/user-info';
import UserTabs from '../components/user-tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const user = useAtomValue(userAtom);
  const token = user?.access;

  const getUserInfo = async () => {
    try {
      const response = await httpClient.get('/user/profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('fetched user data', response.data);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      setLoading(true);
      getUserInfo();
    }
  }, [user]);
  return (
    <ScreenLg>
      <div className='flex flex-col gap-8'>
        {loading ? (
          <div className='flex items-center justify-center'>
            <p>Loading...</p>
          </div>
        ) : profile ? (
          <>
            <UserInfo user={profile} />
            <UserTabs user={profile} />
          </>
        ) : (
          <>
            <p className='text-2xl'>Please sign in to continue</p>
            <Button onClick={() => navigate('/login')}>Sign in</Button>
          </>
        )}
        <p>{JSON.stringify(profile)}</p>
      </div>
    </ScreenLg>
  );
};

export default UserProfile;
