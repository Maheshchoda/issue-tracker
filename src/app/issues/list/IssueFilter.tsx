'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueFilter = () => {
  const router = useRouter();
  const handleStatusChange = (status: string) => {
    const query = status !== 'all_statuses' ? `?status=${status}` : '';
    router.push('/issues/list' + query);
  };
  return (
    <Select.Root onValueChange={handleStatusChange}>
      <Select.Trigger placeholder="Select by Status...." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || 'all_statuses'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
