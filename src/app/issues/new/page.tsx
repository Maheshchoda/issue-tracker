'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDEWrapper from './SimpleMEDWrapper';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, control, handleSubmit } = useForm<IssueForm>();

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
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDEWrapper {...field} placeholder="Description" />}
        />

        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
