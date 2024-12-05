import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/components/api/leaderboard';
import { User } from '@/types/interfaces';

const UserRating = () => {
  const { data: authors } = useQuery({
    queryKey: ['getUsers'],
    queryFn: getUsers,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className='mb-4 text-lg font-medium'>Leaderboard</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {authors
            ? authors.map((author: User) => {
                return (
                  <div key={author.id}>
                    <div className='flex gap-2'>
                      <Avatar className='size-12'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>{author.fullname[0]}</AvatarFallback>
                      </Avatar>
                      <div className=''>
                        <p className='text-md font-medium text-foreground'>
                          {author.fullname}
                        </p>
                        <p className='text-muted-foreground'>
                          Rating: {author.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : 'No users yet'}
        </CardContent>
      </Card>
    </>
  );
};

export default UserRating;
