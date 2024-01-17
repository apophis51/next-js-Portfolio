/*
  Warnings:

  - You are about to drop the column `uniqueIdentifier` on the `CryptoPredictionData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[crypto]` on the table `CryptoPredictionData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CryptoPredictionData_uniqueIdentifier_key";

-- AlterTable
ALTER TABLE "CryptoPredictionData" DROP COLUMN "uniqueIdentifier";

-- CreateIndex
CREATE UNIQUE INDEX "CryptoPredictionData_crypto_key" ON "CryptoPredictionData"("crypto");
