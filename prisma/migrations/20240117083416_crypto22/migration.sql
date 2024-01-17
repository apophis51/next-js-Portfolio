/*
  Warnings:

  - A unique constraint covering the columns `[dateUnEdited]` on the table `CryptoPredictionData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CryptoPredictionData_crypto_key";

-- CreateIndex
CREATE UNIQUE INDEX "CryptoPredictionData_dateUnEdited_key" ON "CryptoPredictionData"("dateUnEdited");
