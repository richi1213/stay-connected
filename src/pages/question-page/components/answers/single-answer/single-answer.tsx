import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Check, ThumbsUp, Highlighter, Dot, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Answer } from '@/pages/question-page/components/answers/answers.types';
import { useAtomValue } from 'jotai';
import { meAtom } from '@/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleAnswerLike } from '@/pages/question-page/api';

const SingleAnswer: React.FC<Answer> = ({
  id,
  text,
  likes_count,
  is_correct,
  author,
}) => {
  const { toast } = useToast();
  const me = useAtomValue(meAtom);
  const isAuthorLoggedIn = me?.id === author.id;

  const queryClient = useQueryClient();

  // const { data: answerData, refetch } = useQuery({
  //   queryKey: ['answer', id],
  //   queryFn: () => getAnswer(id),
  // });

  const [isLiked, setIsLiked] = useState(false);

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => toggleAnswerLike(id),
    onSettled: () => {
      queryClient.invalidateQueries(['answer', id]);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['answer', id]);

      const previousData = queryClient.getQueryData<Answer>(['answer', id]);

      const updatedData = previousData
        ? {
            ...previousData,
            likes_count: previousData.likes_count + (isLiked ? -1 : 1),
          }
        : { likes_count: 0, id, text, is_correct, author };

      queryClient.setQueryData(['answer', id], updatedData);

      setIsLiked((prev) => !prev);

      return { previousData };
    },
    onError: (_, __, context) => {
      // Rollback if there's an error
      queryClient.setQueryData(['answer', id], context?.previousData);
    },
  });

  const [isAccepted, setIsAccepted] = useState(is_correct);

  const handleLikeToggle = () => {
    toggleLike();
  };

  const onAcceptAnswer = () => {
    setIsAccepted(true);
    toast({
      description: 'This answer is marked as accepted',
      duration: 2500,
      action: (
        <ToastAction altText='Undo marking as accepted'>Undo</ToastAction>
      ),
    });
  };

  return (
    <Card className='w-full border-none bg-background text-foreground'>
      <CardContent className='space-y-2 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>{author.fullname.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className='font-medium'>{author.fullname}</span>
            <span className='flex items-center gap-0.5 text-sm text-primary'>
              <Dot className='text-accent-foreground' />
              <Star className='size-4' />
              {author.rating}
            </span>
          </div>
          {isAccepted && (
            <Badge
              variant='outline'
              className='cursor-pointer border-green-300 bg-green-100 text-green-800'
            >
              <Check className='mr-1 h-4 w-4' /> Accepted
            </Badge>
          )}
          {isAuthorLoggedIn && !isAccepted && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    className='text-primary'
                    onClick={onAcceptAnswer}
                  >
                    <Highlighter />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-green-50 text-secondary-foreground'>
                  <p>Mark this answer as accepted</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className='leading-relaxed'>{text}</div>

        <div className='flex items-center gap-2 pt-2'>
          <Toggle
            variant='outline'
            size='sm'
            onClick={handleLikeToggle}
            className='data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
          >
            <ThumbsUp className='mr-1 h-4 w-4 transition-all hover:text-primary' />
            <span className='text-sm'>{likes_count + (isLiked ? 1 : 0)}</span>
          </Toggle>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleAnswer;
