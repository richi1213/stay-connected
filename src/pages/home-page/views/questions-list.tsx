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
          title={'There are no questions yet'}
          buttonTitle='Ask a Question'
          to='/createQuestion'
        />
      )}
    </>
  );
};

export default QuestionsList;
