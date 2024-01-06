-- CreateTable
CREATE TABLE "EthPredictionData" (
    "id" SERIAL NOT NULL,
    "ethprediction" DOUBLE PRECISION NOT NULL,
    "recentprice" DOUBLE PRECISION NOT NULL,
    "recentDate" TEXT NOT NULL,
    "dateUnEdited" INTEGER NOT NULL,

    CONSTRAINT "EthPredictionData_pkey" PRIMARY KEY ("id")
);
