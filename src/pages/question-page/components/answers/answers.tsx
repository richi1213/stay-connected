import { AnswersProps } from '@/pages/question-page/components/answers/answers.types';
import SingleAnswer from '@/pages/question-page/components/answers/single-answer/single-answer';

const Answers: React.FC<AnswersProps> = ({ answers }) => {
  return (
    <div className='mt-6 space-y-6'>
      <h2 className='text-xl font-semibold'>Answers</h2>
      <div className='space-y-5'>
        {answers.map((answer) => (
          <SingleAnswer
            key={answer.id}
            id={answer.id}
            text={answer.text}
            likes_count={answer.likes_count}
            is_correct={answer.is_correct}
            author={answer.author}
          />
        ))}
      </div>
    </div>
  );
};

export default Answers;
