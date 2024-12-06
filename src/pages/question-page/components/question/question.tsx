import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dot } from 'lucide-react';
import { QuestionProps } from '@/pages/question-page/components/question/question.types';
import useFormattedDate from '@/custom-hooks/use-formatted-date';

const Question: React.FC<QuestionProps> = ({ question, author }) => {
  const { title, description, created_at, tags } = question;
  const { fullname, rating } = author;

  const formattedDate = useFormattedDate(created_at);

  return (
    <div className='mt-4 space-y-4'>
      <h2 className='text-3xl font-bold'>{title}</h2>
      <div className='text-sm text-foreground'>
        <div className='flex items-center gap-1'>
          {`Posted by ${fullname} on ${formattedDate}`}
          <Dot className='text-accent-foreground' />
          <p className='text-muted-foreground'>Rating: {rating}</p>
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
