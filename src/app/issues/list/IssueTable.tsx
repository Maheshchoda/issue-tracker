import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Link } from '@/app/components';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order: 'asc' | 'desc';
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const getNextOrder = (currentOrder: 'asc' | 'desc') => (currentOrder === 'asc' ? 'desc' : 'asc');
  return (
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
  );
};

const sortBy: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const sortNames = sortBy.map((item) => item.value);

export default IssueTable;
