'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react';

const statuses: { label: string; value: Status | 'all_statuses' }[] = [
  { label: 'All', value: 'all_statuses' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueFilter = () => {
  const handleStatusChange = (value: string) => {
    const selectedStatus = value === 'all_statuses' ? undefined : (value as Status);
    console.log('selected Status', selectedStatus);
  };
  return (
    <Select.Root onValueChange={handleStatusChange}>
      <Select.Trigger placeholder="Select by Status...." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
