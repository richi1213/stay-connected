import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { ThumbsUp, Highlighter, Check, Dot, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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
import {
  toggleAnswerLike,
  markAnswerAsCorrect,
} from '@/pages/question-page/api';
import { useParams } from 'react-router-dom';

const SingleAnswer: React.FC<Answer> = ({
  id: answerId,
  text,
  likes_count,
  is_correct,
  author,
}) => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const me = useAtomValue(meAtom);
  const isAuthorLoggedIn = me?.id === author.id;

  const queryClient = useQueryClient();

  // Directly calculate initial like status based on likes_count
  const [isLiked, setIsLiked] = useState(likes_count > 0);
  const [localIsCorrect, setLocalIsCorrect] = useState(is_correct);

  useEffect(() => {
    setLocalIsCorrect(is_correct);
  }, [is_correct]);

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => toggleAnswerLike(answerId),
    onMutate: async () => {
      const previousAnswers = queryClient.getQueryData<Answer[]>([
        'answers',
        id,
      ]);

      if (previousAnswers) {
        queryClient.setQueryData(
          ['answers', id],
          previousAnswers.map((answer) =>
            answer.id === answerId
              ? {
                  ...answer,
                  likes_count: answer.likes_count + (isLiked ? -1 : 1),
                }
              : answer,
          ),
        );
      }

      return { previousAnswers };
    },
    onSuccess: () => {
      setIsLiked((prev) => !prev);
    },
    onError: (_, __, context) => {
      if (context?.previousAnswers) {
        queryClient.setQueryData(['answers', id], context.previousAnswers);
      }
    },
  });

  const { mutate: acceptAnswer } = useMutation({
    mutationFn: () => markAnswerAsCorrect(answerId),
    onMutate: async () => {
      const previousAnswers = queryClient.getQueryData<Answer[]>([
        'answers',
        id,
      ]);

      if (previousAnswers) {
        queryClient.setQueryData(
          ['answers', id],
          previousAnswers.map((answer) => ({
            ...answer,
            is_correct: answer.id === answerId,
          })),
        );
      }

      setLocalIsCorrect(true);
      return { previousAnswers };
    },
    onError: (_, __, context) => {
      if (context?.previousAnswers) {
        queryClient.setQueryData(['answers', id], context.previousAnswers);
      }

      toast({
        title: 'Error',
        description: 'Failed to mark answer as accepted.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['answers', id]);
    },
  });

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

          {localIsCorrect ? (
            <Badge
              variant='outline'
              className='border-green-300 bg-green-100 text-green-800'
            >
              <Check className='mr-0 size-3.5 sm:mr-1 sm:size-4' />{' '}
              <span className='hidden sm:block'>Accepted</span>
            </Badge>
          ) : (
            isAuthorLoggedIn && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      className='text-primary'
                      onClick={() => acceptAnswer()}
                    >
                      <Highlighter />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-green-50 text-secondary-foreground'>
                    <p>Mark this answer as accepted</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          )}
        </div>

        <div className='leading-relaxed'>{text}</div>

        <div className='flex items-center gap-2 pt-2'>
          {me && (
            <Toggle
              variant='outline'
              size='sm'
              onClick={() => toggleLike()}
              className='data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
              data-state={isLiked ? 'on' : 'off'}
            >
              <ThumbsUp className='mr-1 h-4 w-4 transition-all hover:text-primary' />
              <span className='text-sm'>{likes_count}</span>
            </Toggle>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleAnswer;
