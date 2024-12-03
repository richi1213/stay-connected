import Loading from '@/components/ui/loading';
import { fetchQuestion } from '@/pages/question-page/api';
// import Answers from '@/pages/question-page/components/answers/answers';
import Question from '@/pages/question-page/components/question/question';
// import WriteAnswer from '@/pages/question-page/components/write-answer/write-answer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// const questionWithAnswers = {
//   question: {
//     id: '28wdsay7dsasd',
//     authorId: '82wewq7dsaghsa',
//     title: 'How to use TypeScript with React?',
//     author: 'Jane Doe',
//     rating: 20,
//     date: '24 Nov 2023',
//     content:
//       'I am trying to understand how to use TypeScript in a React project. Can anyone provide examples or resources?',
//     tags: ['React', 'TypeScript'],
//   },
//   answers: [
//     {
//       id: 'answer1',
//       username: 'nika123',
//       rating: 15,
//       date: '10 Nov 2024',
//       content: 'h abjhsdas sda sdadiuasdai',
//       likes: 2,
//       isCorrect: false,
//     },
//     {
//       id: 'answer2',
//       username: 'diko123',
//       rating: 30,
//       date: '20 Nov 2024',
//       content: 'h abjhsdas sda sdadiuasdai',
//       likes: 1,
//       isCorrect: false,
//     },
//     {
//       id: 'answer3',
//       rating: 0,
//       username: 'nidshasba',
//       date: '10 Nov 2024',
//       content: 'h abjhsdas sda sdadiuasdai',
//       likes: 10,
//       isCorrect: false,
//     },
//   ],
// };

const QuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Error: No ID found</div>;
  }

  // Fetch question details
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useQuery({
    queryKey: ['question', id],
    queryFn: () => fetchQuestion(id!),
  });

  // // Fetch answers
  // const {
  //   data: answersData,
  //   isLoading: isAnswersLoading,
  //   isError: isAnswersError,
  // } = useQuery({
  //   queryKey: ['answers', id],
  //   queryFn: () => fetchAnswers(id!),
  // });

  if (isQuestionLoading) {
    return <Loading />;
  }

  if (isQuestionError) {
    return <div>Error fetching data</div>;
  }

  // const {
  //   question,
  //   answers,
  //   question: { authorId },
  // } = questionWithAnswers;

  return (
    <div className='mb-8 mt-2 flex flex-col items-center'>
      <div className='w-5/6 space-y-10 text-foreground md:w-2/3'>
        <Question question={questionData} />
        {/* <Answers answers={answers} authorId={authorId} />
        <WriteAnswer /> */}
      </div>
    </div>
  );
};

export default QuestionPage;
