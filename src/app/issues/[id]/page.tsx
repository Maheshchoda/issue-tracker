import { IssueStatusBadge } from '@/app/components';
import prisma from '@/app/lib/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="4" my="2" align="center">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}> Edit Issue </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
