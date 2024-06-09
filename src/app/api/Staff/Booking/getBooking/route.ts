// app/api/Booking/getBooking/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getBooking } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const booking = await getBooking();
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.error();
  }
}