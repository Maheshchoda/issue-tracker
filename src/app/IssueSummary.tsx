import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { StatusCountType } from './page';

export default async function IssueSummary({ statusCount }: { statusCount: StatusCountType }) {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: statusCount.OPEN, status: Status.OPEN },
    { label: 'In-progress Issues', value: statusCount.IN_PROGRESS, status: Status.IN_PROGRESS },
    { label: 'Closed Issues', value: statusCount.CLOSED, status: Status.CLOSED },
  ];
  return (
    <Flex gap="4">
      {statuses.map(({ label, status, value }) => (
        <Card key={label}>
          <Flex direction="column" gap="2">
            <Link className="text-sm font-medium" href={`/issues/list?status=${status}`}>
              {label}
            </Link>
            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
