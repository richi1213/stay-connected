import { PropsWithChildren } from 'react';

const ScreenLg: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='mx-4 my-8 max-w-screen-xl sm:mx-12 md:mx-16 2xl:mx-auto 2xl:w-full'>
      {children}
    </div>
  );
};
export default ScreenLg;
