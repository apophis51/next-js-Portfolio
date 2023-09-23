-- CreateTable
CREATE TABLE "RecievedEmails" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "message" TEXT,

    CONSTRAINT "RecievedEmails_pkey" PRIMARY KEY ("id")
);
