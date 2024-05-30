-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('accident', 'breakdown');

-- CreateTable
CREATE TABLE "Issue" (
    "id_issue" SERIAL NOT NULL,
    "driver_id" TEXT NOT NULL,
    "issueType" "IssueType" NOT NULL,
    "bus_id" INTEGER NOT NULL,
    "reported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id_issue")
);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id_Bus") ON DELETE RESTRICT ON UPDATE CASCADE;
