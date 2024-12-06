import Loading from '@/components/ui/loading';
import {
  fetchAnswers,
  fetchQuestion,
  fetchUserProfile,
} from '@/pages/question-page/api';
import Answers from '@/pages/question-page/components/answers/answers';
import Question from '@/pages/question-page/components/question/question';
import WriteAnswer from '@/pages/question-page/components/write-answer/write-answer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { meAtom } from '@/store/auth';

const QuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const me = useAtomValue(meAtom);

  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useQuery({
    queryKey: ['question', id],
    queryFn: () => fetchQuestion(numericId),
  });

  const {
    data: authorData,
    isLoading: isAuthorDataLoading,
    isError: isAuthorDataError,
  } = useQuery({
    queryKey: ['author', questionData?.author_id],
    queryFn: () => fetchUserProfile(questionData!.author_id),
    enabled: !!questionData,
  });

  const {
    data: answersData,
    isLoading: isAnswersLoading,
    isError: isAnswersError,
  } = useQuery({
    queryKey: ['answers', id],
    queryFn: () => fetchAnswers(numericId),
  });

  if (isQuestionLoading || isAnswersLoading || isAuthorDataLoading) {
    return <Loading />;
  }

  if (isQuestionError || isAnswersError || isAuthorDataError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className='mb-8 mt-2 flex flex-col items-center'>
      <div className='w-5/6 space-y-10 text-foreground md:w-2/3'>
        <Question question={questionData} author={authorData} />
        <Answers
          answers={answersData}
          questionAuthorId={questionData.author_id}
        />
        {me && <WriteAnswer />}
      </div>
    </div>
  );
};

export default QuestionPage;
