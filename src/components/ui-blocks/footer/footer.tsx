import ScreenLg from '@/components/layout/page-containers/screen-lg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-border-soft border-t'>
      <ScreenLg>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <div className='text-xl font-bold'>StayConnected</div>
          <p className='text-sm text-muted-foreground'>
            &copy; {currentYear} Team 14. All rights reserved.
          </p>
        </div>
      </ScreenLg>
    </footer>
  );
};

export default Footer;
