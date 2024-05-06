-- CreateEnum
CREATE TYPE "status" AS ENUM ('inactive', 'active');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('staff', 'student', 'driver');

-- CreateTable
CREATE TABLE "User" (
    "id_User" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "image" TEXT,
    "role" "Role" NOT NULL,
    "status" "status",
    "default_Adress_lnt" TEXT,
    "default_Adress_lng" TEXT,
    "default_time" TEXT,
    "key_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_User")
);

-- CreateTable
CREATE TABLE "Key" (
    "id_Key" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id_Key")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id_Booking" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "depart_Time" INTEGER NOT NULL,
    "depart_Date" TIMESTAMP(3) NOT NULL,
    "bus_id" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id_Booking")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id_Bus" SERIAL NOT NULL,
    "bus_Number" INTEGER NOT NULL,
    "id_Driver" INTEGER NOT NULL,
    "bus_Capacity" INTEGER NOT NULL,
    "bus_Status" "status" NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id_Bus")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_key_id_key" ON "User"("key_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_key_id_fkey" FOREIGN KEY ("key_id") REFERENCES "Key"("id_Key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id_Bus") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;
