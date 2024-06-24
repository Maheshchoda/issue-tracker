'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDEWrapper from './SimpleMEDWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });b

  const createIssue = async (inputFields: IssueForm) => {
    try {
      const response = await axios.post('/api/issues', inputFields);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Request failed');
      }
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3 " onSubmit={handleSubmit((data) => createIssue(data))}>
        <TextField.Root {...register('title')} placeholder="Title" />
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDEWrapper {...field} placeholder="Description" />}
        />
        {errors.description && <Text color='red' as="p">{errors.description.message}</Text>}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
