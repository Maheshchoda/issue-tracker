import Pagniation from '@/app/components/Pagniation';
import { Status } from '@prisma/client';
import prisma from '../../lib/client';
import IssueTable, { IssueQuery, sortNames } from './IssueTable';
import IssueToolbar from './IssueToolbar';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const order =
    searchParams.order === 'asc' || searchParams.order === 'desc' ? searchParams.order : 'asc';
  const orderBy = sortNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined;

  const where = { status: status };

  const pageSize = 10;
  const currentPage = parseInt(searchParams.page) || 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="5">
      <IssueToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagniation itemCount={issueCount} pageSize={pageSize} currentPage={currentPage} />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
