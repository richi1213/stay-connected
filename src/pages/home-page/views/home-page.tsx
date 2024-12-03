import QuestionsList from './questions-list.tsx';
import UserRating from './leaderboard.tsx';
import ScreenLg from '@/components/layout/page-containers/screen-lg.tsx';
import TagSelector from './tag-selector.tsx';

const HomePage = () => {
  return (
    <>
      <ScreenLg>
        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='space-y-8 lg:col-span-2'>
            <TagSelector />
            <QuestionsList />
          </div>
          <UserRating />
        </div>
      </ScreenLg>
    </>
  );
};

export default HomePage;
