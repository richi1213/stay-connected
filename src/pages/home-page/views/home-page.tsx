import QuestionsList from './questions-list.tsx';
import UserRating from './leaderboard.tsx';
import ScreenLg from '@/components/layout/page-containers/screen-lg.tsx';
import TagSelector from './tag-selector.tsx';

const HomePage = () => {
  return (
    <>
      <ScreenLg>
        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='flex flex-col gap-4 lg:col-span-3'>
            <p className='font-medium text-foreground'>Popular categories</p>
            <TagSelector />
          </div>
          <div className='lg:col-span-2'>
            <QuestionsList />
          </div>
          <div className='h-auto'>
            <UserRating />
          </div>
        </div>
      </ScreenLg>
    </>
  );
};

export default HomePage;
