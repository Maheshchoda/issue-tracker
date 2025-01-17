import { Skeleton } from '@/app/components';
import { Box, Card, Flex, Heading } from '@radix-ui/themes';

const LoadingIssuePage = () => {
  return (
    <Box>
      <Heading>
        <Skeleton className="max-w-xl" />
      </Heading>
      <Flex gap="4" my="2" align="center">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssuePage;
