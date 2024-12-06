import { getQuestions } from '@/components/api/questions/index.ts';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import QuestionCards from '@/components/ui-blocks/question-cards/question-cards.tsx';
import { Question } from '@/types/interfaces';
import EmptyState from '@/components/ui-blocks/empty-state/empty-state';
const QuestionsList = () => {
  const location = useLocation();

  const { data: questions } = useQuery<Question[], Error>({
    queryKey: ['getQuestionsList', location.search],
    queryFn: () => getQuestions(location.search),
  });
  return (
    <>
      {questions?.length === 0 && <EmptyState title='Nothing found' to='' />}
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
