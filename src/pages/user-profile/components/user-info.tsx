import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '../../../types/interfaces';
import { PropsWithChildren } from 'react';
interface UserInfoProps {
  user: User;
}
const UserInfo: React.FC<PropsWithChildren<UserInfoProps>> = ({ user }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-4'>
        <div>
          <Avatar className='size-12 md:size-24'>
            <AvatarImage src='' />
            <AvatarFallback>{user.fullname[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <CardTitle>
            <p className='truncate text-lg font-bold md:text-2xl'>
              {user.fullname}
            </p>
          </CardTitle>
          <CardDescription className='text-md'>
            <p>Rating: {user.rating}</p>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};
export default UserInfo;
