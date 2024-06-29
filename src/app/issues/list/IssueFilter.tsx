'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams();
    if (status && status !== 'all_statuses') params.append('status', status);
    if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);
    if (searchParams.get('order')) params.append('order', searchParams.get('order')!);

    const query = params.size ? `?${params.toString()}` : '';

    router.push('/issues/list' + query);
  };
  return (
    <Select.Root defaultValue={searchParams.get('status') || ''} onValueChange={handleStatusChange}>
      <Select.Trigger placeholder="Select by Status...." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value || 'all_statuses'} value={status.value || 'all_statuses'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
