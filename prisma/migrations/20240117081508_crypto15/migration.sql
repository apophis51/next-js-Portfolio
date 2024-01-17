/*
  Warnings:

  - A unique constraint covering the columns `[uniqueIdentifier]` on the table `CryptoPredictionData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueIdentifier` to the `CryptoPredictionData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CryptoPredictionData_cryptoprediction_key";

-- AlterTable
ALTER TABLE "CryptoPredictionData" ADD COLUMN     "uniqueIdentifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CryptoPredictionData_uniqueIdentifier_key" ON "CryptoPredictionData"("uniqueIdentifier");
