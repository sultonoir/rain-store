/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuantity` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,notifiId]` on the table `NotifiRead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProduct` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalAmount",
DROP COLUMN "totalQuantity",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalProduct" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NotifiRead_userId_notifiId_key" ON "NotifiRead"("userId", "notifiId");
