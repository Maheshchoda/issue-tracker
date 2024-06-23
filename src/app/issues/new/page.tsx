import { Button, TextArea, TextField } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <div className="space-y-3 max-w-xl">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
