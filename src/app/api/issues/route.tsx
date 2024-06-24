import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/app/lib/client';
import { createIssueSchema } from '@/app/validationSchemas';

interface IssueParams {
  params: { id: number };
}

type CreateIssueType = z.infer<typeof createIssueSchema>;

export async function POST(request: NextRequest) {
  const body: CreateIssueType = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
