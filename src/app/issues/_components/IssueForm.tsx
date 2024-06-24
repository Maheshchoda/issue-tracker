'use client';
import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDEWrapper from './SimpleMEDWrapper';
import { Issue } from '@prisma/client';

type IssueFormType = z.infer<typeof createIssueSchema>;

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
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (inputFields: IssueFormType) => {
    try {
      setSubmitting(true);
      const response = await axios.post('/api/issues', inputFields);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Request failed');
      }
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

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
        <Button disabled={isSubmitting} type="submit">
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
