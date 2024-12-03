import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getQuestions } from '@/components/api/questions/index.ts';
import { useQuery } from '@tanstack/react-query';
import { questionType } from '../types/question.types.ts';
import { Link, useSearchParams } from 'react-router-dom';

const QuestionsList = () => {
  const [searchParams] = useSearchParams();
  const paramKey = searchParams.get('key') as string;
  const paramTags = searchParams.get('tags') as string;
  const { data: questions } = useQuery({
    queryKey: ['getQuestionsList'],
    queryFn: () => getQuestions(paramKey, paramTags),
  });

  const titleSubString = (str: string, count: number) => {
    if (str.length < count) {
      return str;
    }
    const title = str.substring(0, count);
    const lastSpaceIndex = title.lastIndexOf(' ');

    // If there's no space, return the string as is
    if (lastSpaceIndex === -1) {
      return title;
    }

    // Slice the string to get the part before the last space
    return title.slice(0, lastSpaceIndex) + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  console.log(questions);
  return (
    <>
      {questions ? (
        <div className='flex flex-col space-y-8 md:space-y-6 lg:space-y-8'>
          {questions?.map((question: questionType) => {
            return (
              <Link
                to={`/question/${question.id}`}
                key={`question${question.id}`}
              >
                <Card className='space-y-4 px-6 py-4 hover:shadow-md md:px-4 lg:px-6'>
                  <div className='flex flex-row justify-between'>
                    <h2 className='cursor-pointer text-2xl font-bold hover:underline md:text-lg lg:text-2xl'>
                      {titleSubString(question.title, 70)}
                    </h2>
                  </div>
                  <div className='flex cursor-pointer flex-row space-x-1 text-sm text-muted-foreground md:text-xs lg:text-sm'>
                    <span>{question.author.fullname}</span>
                    <span>&#x2022;</span>
                    <span>answers {question.answers_count}</span>
                    <span>&#x2022;</span>
                    <span className='text-muted-foreground'>
                      {formatDate(question.created_at)}
                    </span>
                  </div>
                  <p className='text-md cursor-pointer md:text-sm'>
                    {titleSubString(question.description, 200)}
                  </p>
                  <div className='flex flex-row justify-between'>
                    <div className='flex flex-row flex-wrap items-start gap-2'>
                      {question.tag_names?.map((tag: string) => {
                        return (
                          <Badge
                            className='hover:bg-p cursor-pointer'
                            key={tag}
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className='mt-8 flex w-full flex-col space-y-8 text-center font-semibold md:space-y-6 lg:space-y-8'>
          Data Not Found
        </div>
      )}
    </>
  );
};

export default QuestionsList;
