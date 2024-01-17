/*
  Warnings:

  - You are about to drop the column `ethprediction` on the `CryptoPredictionData` table. All the data in the column will be lost.
  - Added the required column `cryptoprediction` to the `CryptoPredictionData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoPredictionData" DROP COLUMN "ethprediction",
ADD COLUMN     "cryptoprediction" DOUBLE PRECISION NOT NULL;
