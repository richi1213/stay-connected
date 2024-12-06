import ScreenLg from '@/components/layout/page-containers/screen-lg';
import UserInfo from '../components/user-info';
import UserTabs from '../components/user-tabs';
import { useState, useEffect } from 'react';
import { getUserProfile } from '@/components/api/user/getuserinfo';
import { User } from '@/types/interfaces';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const { userId } = useParams<{ userId: string }>();
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const res = await getUserProfile(userId);
        setProfile(res);
      } catch (error) {
        setProfile(null);
      }
    };

    fetchData();
  }, [userId]);

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
            <p>Loading...</p>
            <p>{userId}ss</p>
          </>
        )}
        {/* <p>{JSON.stringify(me)}</p> */}
      </div>
    </ScreenLg>
  );
};

export default UserProfile;
