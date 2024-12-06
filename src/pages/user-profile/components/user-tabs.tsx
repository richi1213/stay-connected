import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserQuestionCards from '../../../components/ui-blocks/question-cards/question-cards';
import { User } from '../../../types/interfaces';
import { PropsWithChildren } from 'react';
import EmptyState from '@/components/ui-blocks/empty-state/empty-state';
import AnswerCards from '@/components/ui-blocks/answer-cards/answer-cards';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { meAtom } from '@/store/auth';
interface UserInfoProps {
  user: User;
}
const UserTabs: React.FC<PropsWithChildren<UserInfoProps>> = ({ user }) => {
  const { userId } = useParams<{ userId: string }>();
  const me = useAtomValue(meAtom);
  const isCurrentUser = userId === String(me?.id);

  return (
    <div className='w-full'>
      <Tabs defaultValue='questions' className='w-full'>
        <TabsList className='w-full'>
          <TabsTrigger className='w-full' value='questions'>
            {isCurrentUser ? 'My Questions' : `Questions`}
          </TabsTrigger>
          <TabsTrigger className='w-full' value='answers'>
            {isCurrentUser ? 'My Answers' : `Answers`}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='questions'>
          <div className='my-8'>
            {user.questions.length > 0 ? (
              <UserQuestionCards questions={user.questions} />
            ) : (
              <EmptyState
                title={
                  isCurrentUser
                    ? "You haven't asked any questions yet"
                    : `${user.fullname} hasn't asked any questions yet`
                }
                buttonTitle='Ask a Question'
                to='/createQuestion'
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value='answers'>
          <div className='my-8'>
            {user.answers.length > 0 ? (
              <AnswerCards answers={user.answers} />
            ) : (
              <EmptyState
                title={
                  isCurrentUser
                    ? "You haven't answered any questions yet"
                    : `${user.fullname} hasn't answered any questions yet`
                }
                buttonTitle='Check recent questions'
                to='/'
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default UserTabs;
