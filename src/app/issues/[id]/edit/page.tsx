import prisma from '@/app/lib/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}
const getIssue = async (id: string) => {
  return await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

const IssueEditPage = async ({ params: { id } }: Props) => {
  const issue = await getIssue(id);
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
