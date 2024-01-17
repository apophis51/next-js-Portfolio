/*
  Warnings:

  - A unique constraint covering the columns `[cryptoprediction]` on the table `CryptoPredictionData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CryptoPredictionData_cryptoprediction_key" ON "CryptoPredictionData"("cryptoprediction");
