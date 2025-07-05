/*
  Warnings:

  - You are about to drop the column `national_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[citizen_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_national_id_idx";

-- DropIndex
DROP INDEX "User_national_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "national_id",
ADD COLUMN     "citizen_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_citizen_id_key" ON "User"("citizen_id");

-- CreateIndex
CREATE INDEX "User_citizen_id_idx" ON "User"("citizen_id");
