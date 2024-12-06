import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  buttonTitle?: string;
  to: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({ title, buttonTitle, to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };
  return (
    <div className='flex flex-col items-center gap-8 rounded-sm bg-gray-50 p-12'>
      <h1 className='text-xl font-medium text-muted-foreground'>{title}</h1>
      {buttonTitle && <Button onClick={handleClick}>{buttonTitle}</Button>}
    </div>
  );
};
export default EmptyState;
