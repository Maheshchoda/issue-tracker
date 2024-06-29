import { Flex } from '@radix-ui/themes';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Status } from '@prisma/client';
import prisma from './lib/client';
import IssueChart from './IssueChart';

export type StatusCountType = {
  [key in Status]: number;
};

export default async function Home() {
  const getCount = async (status: Status): Promise<number> => {
    return await prisma.issue.count({ where: { status } });
  };
  const statusCount: StatusCountType = {
    OPEN: await getCount(Status.OPEN),
    IN_PROGRESS: await getCount(Status.IN_PROGRESS),
    CLOSED: await getCount(Status.CLOSED),
  };
  return (
    <Flex justify="between" align="start">
      <Flex direction="column" gap="5">
        <IssueSummary statusCount={statusCount} />
        <IssueChart statusCount={statusCount} />
      </Flex>
      <LatestIssues />
    </Flex>
  );
}
