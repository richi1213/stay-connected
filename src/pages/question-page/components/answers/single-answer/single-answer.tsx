import { Card, CardContent } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Check, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ExtendedAnswer } from '@/pages/question-page/components/answers/answers.types';
import { useAtomValue } from 'jotai';
import { meAtom } from '@/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  toggleAnswerLike,
  markAnswerAsCorrect,
} from '@/pages/question-page/api';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

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
  const [badgeText, setBadgeText] = useState('Accept');
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
  const handleMouseEnter = () => {
    setBadgeText('Reject');
  };

  const handleMouseLeave = () => {
    setBadgeText('Accepted');
  };

  return (
    <Card className='w-full border border-none border-neutral-200 bg-gray-50 text-foreground shadow-none'>
      <CardContent className='space-y-2 p-4'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>{author.fullname.charAt(0)}</AvatarFallback>
              </Avatar>
              {isQuestionAuthor ? (
                ''
              ) : (
                <div className='flex flex-col'>
                  <Link
                    className='font-medium text-foreground hover:underline'
                    to={`/profile/${author.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {author.fullname}
                  </Link>

                  <p className='text-sm text-muted-foreground'>
                    Rating: {author.rating}
                  </p>
                </div>
              )}
            </div>
            {isQuestionAuthor && (
              <p className='text-xs font-medium text-muted-foreground'>
                ANSWERED BY THE AUTHOR
              </p>
            )}
          </div>
          <div>
            {me?.id === questionAuthorId
              ? questionAuthorId !== author.id &&
                (is_correct ? (
                  <Badge
                    variant='outline'
                    className='w-auto border-green-300 bg-green-100 text-green-800 hover:cursor-pointer hover:border-red-300 hover:bg-red-100 hover:text-red-800'
                    onClick={() => acceptAnswer()}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {badgeText}
                  </Badge>
                ) : (
                  <>
                    <Badge
                      variant='outline'
                      className='w-auto border-gray-300 bg-gray-100 text-gray-800 hover:cursor-pointer hover:bg-gray-200'
                      onClick={() => acceptAnswer()}
                    >
                      Accept
                    </Badge>
                  </>
                ))
              : is_correct && (
                  <>
                    <Badge
                      variant='outline'
                      className='border-green-300 bg-green-100 text-green-800'
                    >
                      <Check className='mr-1 h-4 w-4' /> Accepted
                    </Badge>
                  </>
                )}
          </div>
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
