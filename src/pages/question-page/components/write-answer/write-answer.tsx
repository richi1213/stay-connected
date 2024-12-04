import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AnswerFormSchema,
  AnswerFormData,
} from '@/pages/question-page/components/write-answer/answer-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAnswer } from '@/pages/question-page/api';
import { useParams } from 'react-router-dom';

const WriteAnswer: React.FC = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const form = useForm<AnswerFormData>({
    resolver: zodResolver(AnswerFormSchema),
    defaultValues: {
      yourAnswer: '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (answerData: { text: string }) =>
      postAnswer({
        questionId: id ?? '0',
        answerData: { text: answerData.text },
      }),
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'You have successfully posted your answer!',
      });
      queryClient.invalidateQueries(['answers', id]);
      form.reset();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: 'Failed to post your answer. Please try again.',
      });
    },
  });

  function onSubmit(data: AnswerFormData) {
    mutate({ text: data.yourAnswer });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-3'>
        <FormField
          control={form.control}
          name='yourAnswer'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Your answer</FormLabel>
              <FormControl>
                <Textarea {...field} className='h-24' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post'}
        </Button>
      </form>
    </Form>
  );
};

export default WriteAnswer;
