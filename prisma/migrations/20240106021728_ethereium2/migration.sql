/*
  Warnings:

  - A unique constraint covering the columns `[dateUnEdited]` on the table `EthPredictionData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EthPredictionData_dateUnEdited_key" ON "EthPredictionData"("dateUnEdited");
