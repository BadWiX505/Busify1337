// app/api/Issue/getAllissues/route.ts

import { NextRequest,NextResponse } from 'next/server';
import { getAllIssuesActiveandInactive } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    // Call the getIssues function
    const issues = await getAllIssuesActiveandInactive();

    // Return the issues in the response
    return NextResponse.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.error();
  }
}






