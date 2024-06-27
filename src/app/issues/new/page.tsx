import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = async () => {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');
  return <IssueForm />;
};

export default NewIssuePage;
