// app/api/Issue/updateIssueStatus/route.ts


import { NextRequest, NextResponse } from 'next/server';
import { updateIssueStatusById } from '@/Repo/staffLogic';

export async function POST(req: NextRequest, res: NextResponse) {
  const { issueId, newStatus } = await req.json();
  try {

    if (!issueId || !newStatus) {
      return NextResponse.json({ error: 'Issue ID and new status are required' });
    }

    const updatedIssue = await updateIssueStatusById(issueId, newStatus);

    if (!updatedIssue) {
      return NextResponse.json({ error: 'Issue not found' });
    }

    return Response.json('success',{status : 201})

  } catch (error) {
    console.error('Error updating issue status:', error);
    return NextResponse.json({ error: 'Failed to update issue status' }, { status: 500 });
  }
}






