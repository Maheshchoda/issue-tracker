import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import prisma from './lib/client';
import Link from 'next/link';

export default async function IssueSummary() {
  const getCount = async (status: Status): Promise<number> => {
    return await prisma.issue.count({ where: { status } });
  };
  const statusCount = {
    open: await getCount(Status.OPEN),
    inProgress: await getCount(Status.IN_PROGRESS),
    closed: await getCount(Status.CLOSED),
  };
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: statusCount.open, status: Status.OPEN },
    { label: 'In-progress Issues', value: statusCount.inProgress, status: Status.IN_PROGRESS },
    { label: 'Closed Issues', value: statusCount.closed, status: Status.CLOSED },
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
