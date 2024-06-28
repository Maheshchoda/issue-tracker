'use client';
import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
};

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { id: issueId, assignedToUserId } = issue;
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const AssignUser = (userId: string) => {
    const updateUserId = userId === '_unassigned' ? null : userId;
    axios
      .patch('/api/issues/' + issueId, { assignedToUserId: updateUserId })
      .then(() => toast.success('Success.'))
      .catch(() => toast.error('Changes could not be saved.'));
  };

  return (
    <>
      <Select.Root defaultValue={assignedToUserId || '_unassigned'} onValueChange={AssignUser}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="_unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
