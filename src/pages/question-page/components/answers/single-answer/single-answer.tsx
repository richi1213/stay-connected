import { Card, CardContent } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { ThumbsUp, Check, Dot, Speech, ListCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExtendedAnswer } from '@/pages/question-page/components/answers/answers.types';
import { useAtomValue } from 'jotai';
import { meAtom } from '@/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  toggleAnswerLike,
  markAnswerAsCorrect,
} from '@/pages/question-page/api';
import { useParams } from 'react-router-dom';

const SingleAnswer: React.FC<ExtendedAnswer> = ({
  id: answerId,
  text,
  likes_count,
  authors_of_likes,
  is_correct,
  author,
  questionAuthorId,
}) => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const me = useAtomValue(meAtom);
  const queryClient = useQueryClient();

  const isQuestionAuthor = questionAuthorId === author.id;
  const curUserLiked = me ? authors_of_likes.includes(me.id) : false;

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => toggleAnswerLike(answerId),
    onMutate: async () => {
      const previousAnswers = queryClient.getQueryData<ExtendedAnswer[]>([
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
                  likes_count: answer.likes_count + (curUserLiked ? -1 : 1),
                  authors_of_likes: curUserLiked
                    ? authors_of_likes.filter((userId) => userId !== me?.id)
                    : [...authors_of_likes, me?.id],
                }
              : answer,
          ),
        );
      }

      return { previousAnswers };
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
      const previousAnswers = queryClient.getQueryData<ExtendedAnswer[]>([
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
          <div className='gap-1. flex items-center sm:gap-3'>
            <Avatar>
              <AvatarImage src='' />
              <AvatarFallback>{author.fullname.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className='font-medium'>{author.fullname}</span>
            <span className='flex items-center gap-0.5 text-sm text-primary'>
              <Dot className='hidden text-accent-foreground sm:block' />
              <p className='text-muted-foreground'>Rating: {author.rating}</p>
            </span>
            {isQuestionAuthor && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className='ml-3'>
                      <Speech className='size-5 font-extrabold text-green-600' />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className='bg-primary text-primary-foreground'>
                    <p>Question Author</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {me?.id === questionAuthorId &&
            questionAuthorId !== author.id &&
            (is_correct ? (
              <Button
                variant='outline'
                className='h-8 w-8 border-green-300 bg-green-100 px-0.5 text-green-800 hover:border-red-800 hover:bg-red-200 sm:h-auto sm:w-auto'
                onClick={() => acceptAnswer()}
              >
                <Check />
                <span className='hidden sm:block'>Accepted</span>
              </Button>
            ) : (
              <>
                <Button
                  variant='ghost'
                  className='hidden text-primary sm:block'
                  onClick={() => acceptAnswer()}
                >
                  Mark as correct
                </Button>
                <div className='sm:hidden'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='ghost'
                          className='text-primary'
                          onClick={() => acceptAnswer()}
                        >
                          <ListCheck />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className='bg-green-50 text-secondary-foreground'>
                        <p>Mark this answer as accepted</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </>
            ))}
        </div>

        <div className='leading-relaxed'>{text}</div>

        <div className='flex items-center gap-2 pt-2'>
          {me && (
            <Toggle
              variant='outline'
              size='sm'
              onClick={() => toggleLike()}
              className='data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
              data-state={curUserLiked ? 'on' : 'off'}
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
