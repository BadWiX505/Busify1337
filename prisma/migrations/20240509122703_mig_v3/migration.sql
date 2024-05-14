/*
  Warnings:

  - Added the required column `bus_Name` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "depart_Time" SET DATA TYPE TEXT,
ALTER COLUMN "depart_Date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Bus" ADD COLUMN     "bus_Name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TravelTimes" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "TravelTimes_pkey" PRIMARY KEY ("id")
);
