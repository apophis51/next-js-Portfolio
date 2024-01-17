/*
  Warnings:

  - Changed the type of `uniqueIdentifier` on the `CryptoPredictionData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CryptoPredictionData" DROP COLUMN "uniqueIdentifier",
ADD COLUMN     "uniqueIdentifier" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CryptoPredictionData_uniqueIdentifier_key" ON "CryptoPredictionData"("uniqueIdentifier");
