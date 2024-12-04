import { PropsWithChildren } from 'react';

const ScreenLg: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='mx-4 my-8 sm:mx-12 md:mx-16 2xl:w-full 2xl:mx-auto max-w-screen-xl'>
      {children}
    </div>
  );
};
export default ScreenLg;
