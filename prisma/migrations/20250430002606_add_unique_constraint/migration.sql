/*
  Warnings:

  - A unique constraint covering the columns `[ratingValue,productId]` on the table `RatingStatistics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RatingStatistics_productId_key";

-- DropIndex
DROP INDEX "RatingStatistics_ratingValue_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "discount" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "RatingStatistics_productId_idx" ON "RatingStatistics"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "RatingStatistics_ratingValue_productId_key" ON "RatingStatistics"("ratingValue", "productId");
