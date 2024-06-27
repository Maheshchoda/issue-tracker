import { auth } from '@/app/auth';
import prisma from '@/app/lib/client';
import { issueSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

type CreateIssueType = z.infer<typeof issueSchema>;

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body: CreateIssueType = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
