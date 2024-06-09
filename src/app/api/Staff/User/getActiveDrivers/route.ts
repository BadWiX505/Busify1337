// app/api/User/getActiveDrivers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getActiveDrivers } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const activeDrivers = await getActiveDrivers();
    return NextResponse.json(activeDrivers);
  } catch (error) {
    console.error('Error fetching active drivers:', error);
    return NextResponse.error();
  }
}
