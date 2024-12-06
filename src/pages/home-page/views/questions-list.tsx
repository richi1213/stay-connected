import { getQuestions } from '@/components/api/questions/index.ts';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import QuestionCards from '@/components/ui-blocks/question-cards/question-cards.tsx';
import { Question } from '@/types/interfaces';
import EmptyState from '@/components/ui-blocks/empty-state/empty-state';
const QuestionsList = () => {
  const location = useLocation();

  const { data: questions, refetch } = useQuery<Question[], Error>({
    queryKey: ['getQuestionsList'],
    queryFn: () => getQuestions(location.search),
  });

  useEffect(() => {
    refetch();
  }, [location.search]);

  return (
    <>
      {questions ? (
        <QuestionCards questions={questions} />
      ) : (
        <EmptyState
        title={
        "There are no questions yet" 
        }
        buttonTitle='Ask a Question'
        to='/createQuestion'
      />
        // <div className='mt-8 flex w-full flex-col space-y-8 text-center font-semibold md:space-y-6 lg:space-y-8'>
        //   Data Not Found
        // </div>
      )}
    </>
  );
};

export default QuestionsList;
