import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Answer } from '../../../types/interfaces';
import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AnswerCardProps {
  answers: Answer[];
}
const AnswerCards: React.FC<PropsWithChildren<AnswerCardProps>> = ({
  answers,
}) => {
  const MAX_LENGTH = 256;
  return (
    <div className='flex flex-col gap-6'>
      {answers.map((answer) => {
        const navigate = useNavigate();

        const handleCardClick = (id: string) => {
          navigate(`/question/${id}`);
        };

        const truncatedText =
          answer.text.length > MAX_LENGTH
            ? answer.text.substring(0, MAX_LENGTH) + '...'
            : answer.text;
        return (
          <Card key={answer.id}>
            <CardHeader>
              <div className='flex flex-col gap-2'>
                <div>
                  {answer.is_correct ? (
                    <>
                      <Badge
                        variant='outline'
                        className='border-green-300 bg-green-100 text-green-800'
                      >
                        <Check className='mr-1 h-4 w-4' /> Accepted
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge
                        variant='outline'
                        className='border-gray-300 bg-gray-100 text-gray-800'
                      >
                        Not yet accepted
                      </Badge>
                    </>
                  )}
                </div>
                <CardTitle className='text-lg'>{truncatedText}</CardTitle>
              </div>
              <CardDescription className='flex items-center gap-2'>
                <p className='text-md text-muted-foreground'>By you •</p>
                <div className='inline-flex items-center'>
                  <ThumbsUp className='mr-1 h-4 w-4 text-muted-foreground' />
                  <p>{answer.likes_count}</p>
                </div>
              </CardDescription>
            </CardHeader>

            <CardFooter className='flex flex-col items-start gap-4 sm:flex-row sm:justify-between'>
              <div className='flex gap-2'>
                <Button
                  variant='secondary'
                  onClick={() => handleCardClick(answer.question_id.toString())}
                >
                  View Question
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
export default AnswerCards;
