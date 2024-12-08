import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { QuestionProps } from '@/pages/question-page/components/question/question.types';
import useFormattedDate from '@/custom-hooks/use-formatted-date';
import { Link } from 'react-router-dom';

const Question: React.FC<QuestionProps> = ({ question, author }) => {
  const { title, description, created_at, tags } = question;
  const { fullname, rating, id } = author;

  const formattedDate = useFormattedDate(created_at);

  return (
    <div className='mt-4 space-y-4'>
      <h2 className='text-3xl font-bold'>{title}</h2>
      <div>
        <p className='text-sm text-muted-foreground'>
          Posted by{' '}
          <Link
            className='hover:underline'
            to={`/profile/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            {fullname}
          </Link>
          • Rating: {rating} • on {formattedDate}
        </p>
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
