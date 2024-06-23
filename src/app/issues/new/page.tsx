'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button, Callout, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

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
      await axios.post('/api/issues', inputFields);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3 " onSubmit={handleSubmit((data) => createIssue(data))}>
        <TextField.Root {...register('title')} placeholder="Title" />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />

        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
