/*
  Warnings:

  - Added the required column `crypto` to the `CryptoPredictionData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoPredictionData" ADD COLUMN     "crypto" TEXT NOT NULL;
