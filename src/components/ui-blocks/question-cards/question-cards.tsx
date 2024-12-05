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
import { format } from 'date-fns';
import { Check } from 'lucide-react';
interface QuestionCardProps {
  questions: Question[];
}
const QuestionCards: React.FC<PropsWithChildren<QuestionCardProps>> = ({
  questions,
}) => {
  return (
    <div className='flex flex-col gap-6'>
      {questions.map((question) => {
        const navigate = useNavigate();
        const handleCardClick = (id: string) => {
          navigate(`/question/${id}`);
        };
        const formattedDate = format(
          new Date(question.created_at),
          'dd MMM yyyy',
        );
        
        const hasCorrectAnswer = question.answers.some((answer) => answer.isCorrect === true);

        
        const numberOfAnswers = question.answers?.length || 0;
        return (
          <Card onClick={() => handleCardClick(question.id)} key={question.id}>
            <CardHeader>
              <div className="flex flex-col gap-2">
              {hasCorrectAnswer ? (
                <div className="inline-flex">
                      <Badge
                        variant='outline'
                        className='border-green-300 bg-green-100 text-green-800 w-auto'
                      >
                        <Check className='mr-1 h-4 w-4' /> Answered
                      </Badge>
                      </div>
                  ) : (
                    <div className="inline-flex">
                      <Badge
                        variant='outline'
                        className='border-gray-300 bg-gray-100 text-gray-800 w-auto'
                      >
                        Not Answered Yet
                      </Badge>
                      </div>
                  )}
                  <CardTitle className='text-lg'>{question.title}</CardTitle>
                  </div>
              <CardDescription>
                {question.author.fullname} • {formattedDate}
                {/* {question.created_at.substring(0, 10)} */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-md text-muted-foreground'>
                {question.description}
              </p>
            </CardContent>
            <CardFooter className='flex flex-col items-start gap-4 sm:flex-row sm:justify-between'>
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
