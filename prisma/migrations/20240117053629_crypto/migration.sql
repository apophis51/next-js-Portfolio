/*
  Warnings:

  - You are about to drop the `EthPredictionData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EthPredictionData";

-- CreateTable
CREATE TABLE "CryptoPredictionData" (
    "id" SERIAL NOT NULL,
    "predictionDays" INTEGER NOT NULL,
    "ethprediction" DOUBLE PRECISION NOT NULL,
    "recentprice" DOUBLE PRECISION NOT NULL,
    "recentDate" TEXT NOT NULL,
    "dateUnEdited" BIGINT NOT NULL,

    CONSTRAINT "CryptoPredictionData_pkey" PRIMARY KEY ("id")
);
