import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/components/api/leaderboard';

const UserRating = () => {
  const { data: authors } = useQuery({
    queryKey: ['getUsers'],
    queryFn: getUsers,
  });
  console.log('leaderboard', authors);
  const getInitials = (fullname: string) => {
    // Split the full name into an array of words (by space)
    const nameParts = fullname.split(' ');

    // Get the first letter of each part, and capitalize it
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join('');

    return initials;
  };
  return (
    <>
      <Card className='px-6 py-4 md:p-4'>
        <h2 className='mb-4 text-2xl font-bold md:text-lg lg:text-2xl'>
          Leaderboard
        </h2>
        <div className='mt-2 space-y-6 md:space-y-4 lg:space-y-6'>
          {authors?.map((author: any, i: number) => {
            //const color = colors[Math.floor(Math.random() * colors.length)];

            return (
              <div
                className='flex flex-row items-center gap-4 md:gap-2 lg:gap-4'
                key={author.id}
              >
                <div>
                  <Avatar className='border'>
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className='bg-violet-200 font-semibold'>
                      {getInitials(author.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className='cursor-pointer'>
                  <div className='text-md lg:text-md font-semibold hover:underline md:text-sm'>
                    {author.name}
                  </div>
                  <p className='md:text-sx text-sm text-muted-foreground lg:text-sm'>
                    Rating: {(i + 1) * 23}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default UserRating;
