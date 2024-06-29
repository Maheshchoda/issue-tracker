import { IssueStatusBadge, Link } from '@/app/components';
import { Table } from '@radix-ui/themes';
import prisma from '../../lib/client';
import IssueToolbar from './IssueToolbar';
import NextLink from 'next/link';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; order: 'asc' | 'desc' };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const sortBy: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const order =
    searchParams.order === 'asc' || searchParams.order === 'desc' ? searchParams.order : 'asc';
  const orderBy = sortBy.map((item) => item.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });

  const getNextOrder = (currentOrder: 'asc' | 'desc') => (currentOrder === 'asc' ? 'desc' : 'asc');

  return (
    <>
      <IssueToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {sortBy.map((sortItem) => (
              <Table.ColumnHeaderCell key={sortItem.value} className={sortItem.className}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: sortItem.value,
                      order: getNextOrder(searchParams.order),
                    },
                  }}
                >
                  {sortItem.label}
                  {sortItem.value === searchParams.orderBy &&
                    (searchParams.order === 'asc' ? (
                      <ArrowUpIcon className="inline" />
                    ) : (
                      <ArrowDownIcon className="inline" />
                    ))}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
