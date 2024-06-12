import { NextRequest, NextResponse } from 'next/server';
import { updateStudent } from '@/Repo/staffLogic';

// POST method to update student status
export async function POST(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    const updatedStudent = await updateStudent(id, status);
    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student status:', error);
    return NextResponse.error();
  }
}
