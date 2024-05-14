-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Completed', 'Missed');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingStatus" "BookingStatus";
