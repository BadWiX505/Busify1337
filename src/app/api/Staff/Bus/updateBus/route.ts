// app/api/Bus/updateBus/route.ts

import { NextResponse } from 'next/server';
import { editBus } from '@/Repo/staffLogic';

export async function POST(req: Request) {
  try {
    const updatedBusData = await req.json();

    // Ensure that id_Bus is included in the data
    const { id_Bus } = updatedBusData;

    if (!id_Bus) {
      return NextResponse.json({ error: 'Bus ID is required' }, { status: 400 });
    }

    // Call the editBus function to update the bus in the database
    const updatedBus = await editBus(id_Bus, updatedBusData);

    if (!updatedBus) {
      return NextResponse.json({ error: 'Bus not found' }, { status: 404 });
      
    }

    return NextResponse.json({ message: 'Bus updated successfully', bus: updatedBus }, { status: 200 });
  } catch (error) {
    console.error('Error updating bus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

