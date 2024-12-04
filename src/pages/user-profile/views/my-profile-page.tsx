import { meAtom } from '@/store/auth';
import { useAtomValue } from 'jotai';

import ScreenLg from '@/components/layout/page-containers/screen-lg';
import UserInfo from '../components/user-info';
import UserTabs from '../components/user-tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();
  const me = useAtomValue(meAtom);

  return (
    <ScreenLg>
      <div className='w-full flex flex-col gap-8'>
        {me ? (
          <>
            <UserInfo user={me} />
            <UserTabs user={me} />
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
