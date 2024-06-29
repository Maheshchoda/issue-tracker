import { auth } from '@/app/auth';
import prisma from '@/app/lib/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface Props {
  params: { id: string };
}

const getIssue = cache((id: string) =>
  prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  }),
);
const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await auth();
  const issue = await getIssue(id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="col-span-1">
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await getIssue(params.id);

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
