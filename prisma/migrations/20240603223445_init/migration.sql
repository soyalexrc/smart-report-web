-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "clinic" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "receipt_number" TEXT NOT NULL,
    "hc_number" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "unit_price" TEXT NOT NULL,
    "total_price" TEXT NOT NULL,
    "amount_received" TEXT NOT NULL,
    "change" TEXT NOT NULL,
    "ticket_number" TEXT NOT NULL,
    "appointment_date" TEXT NOT NULL,
    "appointment_time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_receipt_number_key" ON "Ticket"("receipt_number");
