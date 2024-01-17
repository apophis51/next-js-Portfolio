/*
  Warnings:

  - You are about to alter the column `predictionDays` on the `CryptoPredictionData` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "CryptoPredictionData" ALTER COLUMN "predictionDays" SET DATA TYPE INTEGER;
