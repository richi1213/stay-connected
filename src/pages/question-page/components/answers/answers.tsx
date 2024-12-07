import { AnswersProps } from '@/pages/question-page/components/answers/answers.types';
import SingleAnswer from '@/pages/question-page/components/answers/single-answer/single-answer';

const Answers: React.FC<AnswersProps> = ({ answers, questionAuthorId }) => {
  return (
    <div className='mt-6 space-y-6'>
      <h2 className='text-xl font-semibold'>Answers</h2>
      <div className='space-y-5'>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <SingleAnswer
              key={answer.id}
              id={answer.id}
              text={answer.text}
              likes_count={answer.likes_count}
              authors_of_likes={answer.authors_of_likes}
              is_correct={answer.is_correct}
              author={answer.author}
              questionAuthorId={questionAuthorId}
            />
          ))
        ) : (
          <p className='text-muted-foreground'>
            This question isn't answered yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Answers;
