// app/api/User/updateDriverStatus/routes.ts

import { NextRequest, NextResponse } from 'next/server';
import { toggleDriverStatus } from '@/Repo/staffLogic';

export default async function (req: NextRequest) {
  try {
    const { id, status } = await req.json();
    const updatedDriver = await toggleDriverStatus(id, status);
    return NextResponse.json(updatedDriver);
  } catch (error) {
    console.error('Error updating driver status:', error);
    return NextResponse.error();
  }
}
