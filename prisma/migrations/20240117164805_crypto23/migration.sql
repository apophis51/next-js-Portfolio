/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `CryptoPredictionData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `CryptoPredictionData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CryptoPredictionData_dateUnEdited_key";

-- AlterTable
ALTER TABLE "CryptoPredictionData" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CryptoPredictionData_uniqueId_key" ON "CryptoPredictionData"("uniqueId");
