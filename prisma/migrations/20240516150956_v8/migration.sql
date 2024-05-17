/*
  Warnings:

  - Added the required column `bus_id` to the `Duty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Duty" ADD COLUMN     "bus_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id_Bus") ON DELETE RESTRICT ON UPDATE CASCADE;
