// app/api/Reports/getReports/routes.ts

import { NextRequest, NextResponse } from 'next/server';
import { getReports } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  const params =  req.nextUrl.searchParams;

  try {
    const reporterIdValue= params.get("reporterId");
    const reportedUserIdValue = params.get('reportedUserId');

    // Call getReports function with query parameters
    const reports = await getReports(reporterIdValue, reportedUserIdValue);
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.error();
  }
}
