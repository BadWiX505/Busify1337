// app/api/Reports/getReports/routes.ts

import { NextRequest, NextResponse } from 'next/server';
import { getReports } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    // Retrieve query parameters for reporterId and reportedUserId
    const reporterId = req.url.split('?')[1]?.split('&').find(param => param.startsWith('reporterId='));
    const reportedUserId = req.url.split('?')[1]?.split('&').find(param => param.startsWith('reportedUserId='));

    // Extract values from query parameters
    const reporterIdValue = reporterId ? reporterId.split('=')[1] : undefined;
    const reportedUserIdValue = reportedUserId ? reportedUserId.split('=')[1] : undefined;

    // Call getReports function with query parameters
    const reports = await getReports(reporterIdValue, reportedUserIdValue);
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.error();
  }
}
