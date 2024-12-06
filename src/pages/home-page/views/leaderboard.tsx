import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/components/api/leaderboard';
import { User } from '@/types/interfaces';
import { Link } from 'react-router';

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
        <CardContent className='flex flex-col gap-6'>
          {authors
            ? authors.map((author: User) => {
                return (
                  <div key={author.id}>
                    <Link to={`/profile/${author.id}`} className='block'>
                      <div className='flex gap-2'>
                        <Avatar className='size-12'>
                          <AvatarImage src='' />
                          <AvatarFallback>{author.fullname[0]}</AvatarFallback>
                        </Avatar>
                        <div className=''>
                          <p className='text-md font-medium text-foreground hover:underline'>
                            {author.fullname}
                          </p>
                          <p className='text-muted-foreground'>
                            Rating: {author.rating}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            : 'No users with the rating yet'}
        </CardContent>
      </Card>
    </>
  );
};

export default UserRating;
