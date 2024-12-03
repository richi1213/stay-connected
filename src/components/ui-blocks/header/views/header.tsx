import Logo from '../components/logo';
import Controls from '../components/controls';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ScreenLgHeader from '@/components/layout/page-containers/screen-lg-header';
import { ChangeEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchKey, setSerachKey] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSerachKey(value);
  };
  const handleSearch = () => {
    const searchPath =
      location.search === ''
        ? `?search=${searchKey}`
        : `${location.search}&search=${searchKey}`;
    navigate(searchPath);
  };
  return (
    <div className='border-border-soft border-b'>
      <ScreenLgHeader>
        <div className='grid grid-cols-2 grid-rows-[auto_auto] items-center gap-y-8 py-4 md:grid-cols-[auto_1fr_auto] md:grid-rows-1 md:gap-16 lg:gap-32 xl:gap-64'>
          <div className='col-span-1 md:col-start-1'>
            <Logo />
          </div>

          <div className='col-span-2 flex w-full items-center gap-4 md:col-span-1 md:col-start-2'>
            <Input
              placeholder='Search...'
              name='search'
              value={searchKey}
              onChange={handleSearchText}
            />
            <Button variant='secondary' onClick={handleSearch}>
              <Search />
            </Button>
          </div>

          <div className='col-span-1 col-start-2 row-start-1 flex justify-end md:col-start-3'>
            <Controls />
          </div>
        </div>
      </ScreenLgHeader>
    </div>
  );
};

export default Header;
