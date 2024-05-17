-- CreateEnum
CREATE TYPE "DutyStatus" AS ENUM ('Pending', 'Scanning', 'Driving');

-- CreateTable
CREATE TABLE "Duty" (
    "id_Duty" SERIAL NOT NULL,
    "duty_Time" TEXT NOT NULL,
    "duty_Date" TEXT NOT NULL,
    "duty_Status" "DutyStatus",

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id_Duty")
);
