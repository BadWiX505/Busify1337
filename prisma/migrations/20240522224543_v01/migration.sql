/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Key` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `emaile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reportedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_key_id_fkey";

-- DropIndex
DROP INDEX "User_key_id_key";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "reporterId" SET DATA TYPE TEXT,
ALTER COLUMN "reportedUserId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "key_id",
ADD COLUMN     "emaile" TEXT NOT NULL,
ALTER COLUMN "id_User" DROP DEFAULT,
ALTER COLUMN "id_User" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_User");
DROP SEQUENCE "User_id_User_seq";

-- DropTable
DROP TABLE "Key";

-- CreateTable
CREATE TABLE "Provider" (
    "userId" TEXT NOT NULL,
    "provider_Id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("provider_Id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_User") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_User") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;
