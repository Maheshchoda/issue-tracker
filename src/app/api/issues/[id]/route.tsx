import { auth } from '@/app/auth';
import prisma from '@/app/lib/client';
import { patchIssueSchema, PatchIssueSchemaType } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

const getIssue = async (issueId: string) => {
  return await prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  });
};

const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export async function PATCH(request: NextRequest, { params: { id: issueId } }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  const body: PatchIssueSchemaType = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });
  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await getUser(assignedToUserId);
    if (!user) return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
  }

  const issue = await getIssue(issueId);

  if (!issue) return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params: { id: issueId } }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await getIssue(issueId);

  if (!issue) return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  try {
    await prisma.issue.delete({
      where: {
        id: issue.id,
      },
    });
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: 'Un expected error occured' });
  }
}
