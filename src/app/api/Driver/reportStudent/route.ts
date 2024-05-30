import { reportStudent } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'

const prisma = new PrismaClient();

export async function POST(request : NextRequest) {
  try {
     const {user}  = await validateRequest();

    if(user && user.idUser && user.role==='driver' && user.busId){
    const { reason, description , studentId} = await request.json();

    const reasonSchema = z.enum([
      "Disruptive Behavior",
      "Damage to Property",
      "Safety Violations",
      "Misconduct"
    ]);

    const validatedreason = reasonSchema.parse(reason);
    //reporterId,sudentId,reason,comment,busId
    const report = await reportStudent(user.idUser,studentId,validatedreason,description,user.busId);
    if(!report)
        return Response.json('an error happened during reporting operation !',{status : 500})

    return Response.json(true, { status: 200 });
}
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
