/*
  Warnings:

  - You are about to drop the column `default_Adress_lnt` on the `User` table. All the data in the column will be lost.
  - The `default_Adress_lng` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "default_Adress_lnt",
ADD COLUMN     "default_Adress_lat" DOUBLE PRECISION,
DROP COLUMN "default_Adress_lng",
ADD COLUMN     "default_Adress_lng" DOUBLE PRECISION;
