import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../../types/interfaces';
import { PropsWithChildren } from 'react';
import useFormattedDate from '../../../custom-hooks/use-formatted-date';

interface QuestionCardProps {
  questions: Question[];
}
const QuestionCards: React.FC<PropsWithChildren<QuestionCardProps>> = ({
  questions,
}) => {
  return (
    <div className='flex flex-col gap-6'>
      {questions.map((question) => {
        const isoDate = question.created_at;
        const formattedDate = useFormattedDate(isoDate);
        const navigate = useNavigate();
        const handleCardClick = (id: string) => {
          navigate(`/question/${id}`);
        };
        const numberOfAnswers = question.answers?.length || 0;
        return (
          <Card onClick={() => handleCardClick(question.id)} key={question.id}>
            <CardHeader>
              <CardTitle className='text-lg'>{question.title}</CardTitle>
              <CardDescription>
                {question.author.fullname} • {formattedDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-md text-muted-foreground'>
                {question.description}
              </p>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <div className='flex gap-2'>
                {question.tag_names.map((tag) => {
                  return (
                    <Badge className='cursor-pointer' key={tag}>
                      {tag}
                    </Badge>
                  );
                })}
              </div>
              <p className='text-sm text-muted-foreground'>
                Answers: {numberOfAnswers}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
export default QuestionCards;
