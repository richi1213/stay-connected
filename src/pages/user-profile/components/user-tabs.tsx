import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserQuestionCards from '../../../components/ui-blocks/question-cards/question-cards';
import { User } from '../../../types/interfaces';
import { PropsWithChildren } from 'react';
import EmptyState from '@/components/ui-blocks/empty-state/empty-state';
interface UserInfoProps {
  user: User;
}
const UserTabs: React.FC<PropsWithChildren<UserInfoProps>> = ({ user }) => {

  return (
    <div className='w-full'>
      <Tabs defaultValue='questions' className='w-full'>
        <TabsList className='w-full'>
          <TabsTrigger className='w-full' value='questions'>
            My Questions
          </TabsTrigger>
          <TabsTrigger className='w-full' value='answers'>
            My Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value='questions'>
          <div className='my-8'>
            {user.questions.length > 0 ? <UserQuestionCards questions={user.questions} /> : <EmptyState title="You haven't asked any questions yet" buttonTitle='Ask a Question' to="/createQuestion"/>}
            
          </div>
        </TabsContent>
        <TabsContent value='answers'>
        <div className='my-8'>
            {user.answers.length > 0 ? <UserQuestionCards questions={user.questions} /> : <EmptyState title="You haven't answered any questions yet" buttonTitle='Check recent questions' to="/"/>}
            
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default UserTabs;
