import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Question } from '../../../types/interfaces';
import { PropsWithChildren } from 'react';

interface QuestionCardProps {
  questions: Question[];
}
const QuestionCards: React.FC<PropsWithChildren<QuestionCardProps>> = ({
  questions,
}) => {
  return (
    <div className='flex flex-col gap-6'>
      {questions.map((question) => {
        const numberOfAnswers = question.answers?.length || 0;
        return (
          <Link to={`/question/${question.id}`} key={question.id}>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>{question.title}</CardTitle>
                <CardDescription>
                  {question.author.fullname} • {question.created_at}
                </CardDescription>
                {question.answers.some((answer) => answer.isCorrect) && (
                  <div className='text-sm text-green-500'>Correct</div>
                )}
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
          </Link>
        );
      })}
    </div>
  );
};
export default QuestionCards;
