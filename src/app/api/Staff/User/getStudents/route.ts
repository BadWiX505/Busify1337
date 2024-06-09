// app/api/User/getStudents/routes.ts

import { NextRequest, NextResponse } from 'next/server';
import { getStudents } from '@/Repo/staffLogic';

export async function GET(req: NextRequest) {
  try {
    const users = await getStudents();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.error();
  }
}