-- CreateTable
CREATE TABLE "PhoneEmailUnsubscribe" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "PhoneEmailUnsubscribe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhoneEmailUnsubscribe_email_key" ON "PhoneEmailUnsubscribe"("email");
