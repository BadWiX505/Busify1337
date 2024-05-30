/*
  Warnings:

  - A unique constraint covering the columns `[id_Driver]` on the table `Bus` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "busId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Bus_id_Driver_key" ON "Bus"("id_Driver");
