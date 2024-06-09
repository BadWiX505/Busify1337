// app/api/Bus/getBus/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getBus, HighestBusId } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '4');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch buses and highest bus ID
    const buses = await getBus(limit, offset);
    const highestBusId = await HighestBusId();

    return NextResponse.json({ buses, highestBusId });
  } catch (error) {
    console.error('Error fetching buses:', error);
    return NextResponse.error();
  }
}
