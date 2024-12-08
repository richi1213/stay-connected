import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { useAtom, useSetAtom } from 'jotai';
import { meAtom, userAtom } from '@/store/auth';
const Controls: React.FC = () => {
  const setUser = useSetAtom(userAtom);
  const [me, setMe] = useAtom(meAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setMe(null);
    localStorage.removeItem('data');
    navigate('/home');
  };

  return (
    <div>
      {me ? (
        <div className='flex items-center gap-4'>
          <Link to='createQuestion'>
            <Button variant='default'>
              <span className='block sm:hidden'>Ask</span>
              <span className='hidden sm:block'>Ask a Question</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='hover:cursor-pointer'>
                <AvatarImage src='' />
                <AvatarFallback>{me.fullname[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuGroup>
                <Link to='/profile'>
                  <DropdownMenuItem>
                    <User className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-red-600' onClick={handleLogout}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div>
          <Button onClick={() => navigate('/login')}>Sign In</Button>
        </div>
      )}
    </div>
  );
};
export default Controls;
