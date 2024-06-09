// app/api/User/getDrivers/routes.ts

import { NextRequest, NextResponse } from 'next/server';
import { getDrivers, toggleDriverStatus} from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const users = await getDrivers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    

    const updatedDriver = await toggleDriverStatus(id, status);

    console.log('Driver status toggled successfully:', updatedDriver);

    return NextResponse.json(updatedDriver);
  } catch (error) {
    console.error('Error updating driver status:', error);

    return NextResponse.error();
  }
}