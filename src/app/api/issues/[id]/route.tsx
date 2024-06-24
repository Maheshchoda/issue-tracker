import prisma from '@/app/lib/client';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema, IssueSchemaType } from '@/app/validationSchemas';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id: issueId } }: Props) {
  const body: IssueSchemaType = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  });

  if (!issue) return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
