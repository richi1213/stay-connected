import FormContainer from '@/components/layout/page-containers/form-container';
import ScreenMd from '@/components/layout/page-containers/screen-md';
import { FancyMultiSelect } from '@/components/ui-blocks/fancy-multi-select/fancy-multi-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { sendQuestion } from './send-question';

import { useNavigate } from 'react-router-dom';
type FormFields = {
  title: string;
  description: string;
  tags: string[];
};

type Framework = {
  value: string;
  label: string;
};

const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const { mutate: handleSendForm } = useMutation({
    mutationFn: (data: any) => sendQuestion(data),
    onSuccess: () => {
      navigate('/');
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });

  const title = register('title', {
    required: 'Title should not be empty',
    maxLength: {
      value: 100,
      message: 'Title should not exceed 100 characters',
    },
  });
  const description = register('description', {
    required: 'Description should not be empty',
  });

  const handleTagsChange = (tags: Framework[]) => {
    const formattedTags = tags.map((tag) => tag.value);
    setValue('tags', formattedTags);
  };

  return (
    <ScreenMd>
      <div className='my-4'>
        <h1 className='text-2xl font-bold'>Ask a Question</h1>
      </div>
      <FormContainer
        onSubmit={handleSubmit((data) => {
          handleSendForm(data);
        })}
      >
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input {...title} id='title' />
          <p className='my-2 text-red-500'>{errors.title?.message}</p>
        </div>
        <div>
          <Label htmlFor='description'>Description</Label>
          <Textarea {...description} id='description' />
          <p className='my-2 text-red-500'>{errors.description?.message}</p>
        </div>
        <div>
          <Label htmlFor='tags'>Tags</Label>
          <FancyMultiSelect onTagsChange={handleTagsChange} />
          <p className='my-2 text-red-500'>{errors.tags?.message}</p>
        </div>
        <Button>Ask a Question</Button>
      </FormContainer>
    </ScreenMd>
  );
};

export default CreateQuestionPage;
