'use client';
import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Flex, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDEWrapper from './SimpleMEDWrapper';
import { Issue } from '@prisma/client';

type IssueFormType = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<IssueFormType>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (formInputData: IssueFormType) => {
    try {
      setSubmitting(true);
      let response;
      if (issue) {
        response = await axios.patch(`/api/issues/${issue.id}`, formInputData);
      } else {
        response = await axios.post('/api/issues', formInputData);
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Request failed');
      }
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  const onCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push('/issues/list');
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3 " onSubmit={onSubmit}>
        <TextField.Root {...register('title')} defaultValue={issue?.title} placeholder="Title" />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDEWrapper {...field} placeholder="Description" />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Flex gap="4">
          <Button className='hover:cursor-pointer' disabled={isSubmitting} type="submit">
            {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
          </Button>
          <Button className='hover:cursor-pointer' color="red" onClick={onCancel}>
            Cancel
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default IssueForm;
