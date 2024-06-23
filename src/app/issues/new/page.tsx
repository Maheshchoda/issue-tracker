'use client';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const createIssue = async (inputFields: IssueForm) => {
    await axios.post('/api/issues', inputFields);
    router.push('/issues');
  };
  return (
    <form className="space-y-3 max-w-xl" onSubmit={handleSubmit((data) => createIssue(data))}>
      <TextField.Root {...register('title')} placeholder="Title" />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
