import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Author,
  QuestionProps,
} from '@/pages/question-page/components/question/question.types';
import { Dot, Star } from 'lucide-react';
// import { fetchUser } from '@/pages/question-page/api';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '@/components/ui/loading';

const Question: React.FC<QuestionProps> = ({ question }) => {
  const { title, description, created_at, tags, author_id } = question;

  // const {
  //   data: authorData,
  //   isLoading: isAuthorLoading,
  //   isError: isAuthorError,
  // } = useQuery<Author>({
  //   queryKey: ['author', author_id],
  //   queryFn: () => fetchUser(author_id),
  // });

  // if (isAuthorLoading) {
  //   return <Loading />;
  // }

  // if (isAuthorError) {
  //   return <div>Error fetching author data</div>;
  // }

  // const { fullname, rating } = authorData;

  return (
    <div className='mt-4 space-y-4'>
      <h2 className='text-3xl font-bold'>{title}</h2>
      <div className='text-sm text-foreground'>
        <div className='flex items-center gap-1'>
          {`Posted by ${author_id} on ${created_at}`}
          <Dot className='text-accent-foreground' />
          <span className='flex items-center gap-1 text-primary'>
            <Star className='size-4' />
            {'TEMP-RATING'}
          </span>
        </div>
      </div>
      <Separator />
      <div className='text-justify leading-relaxed'>{description}</div>
      <div className='space-x-2'>
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant='secondary'
            className='cursor-pointer font-bold'
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Question;
