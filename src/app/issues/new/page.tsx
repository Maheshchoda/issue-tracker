'use client';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
  return (
    <div className="space-y-3 max-w-xl">
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
