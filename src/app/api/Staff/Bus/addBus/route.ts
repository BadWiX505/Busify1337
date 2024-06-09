// app/api/Bus/addBus/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { addBus } from '@/Repo/staffLogic';

export async function POST(req: NextRequest) {
  try {
    const busData = await req.json();

    // Add bus to the database
    const newBus = await addBus(busData);

    return NextResponse.json(newBus);
  } catch (error) {
    console.error('Error adding bus:', error);
    return Response.json((error.message || 'Failed to add bus'), { status: 500 });
  }
}
