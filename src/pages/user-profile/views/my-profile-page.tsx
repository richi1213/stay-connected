import ScreenLg from '@/components/layout/page-containers/screen-lg';
import UserInfo from '../components/user-info';
import UserTabs from '../components/user-tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserInfo } from '@/components/api/user/getuserinfo';
import { User } from '@/types/interfaces';

const MyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo();
        setProfile(res);
      } catch (error) {
        setProfile(null);
      }
    };

    fetchData();
  }, []);
  return (
    <ScreenLg>
      <div className='flex w-full flex-col gap-8'>
        {profile ? (
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
        {/* <p>{JSON.stringify(me)}</p> */}
      </div>
    </ScreenLg>
  );
};

export default MyProfile;
