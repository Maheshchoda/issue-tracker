import prisma from '@/app/lib/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

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

  return <IssueForm issue={issue}/>;
};

export default IssueEditPage;
