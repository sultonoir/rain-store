-- AlterTable
ALTER TABLE "Notifi" ADD COLUMN     "couponId" TEXT,
ADD COLUMN     "promoId" TEXT;

-- AddForeignKey
ALTER TABLE "Notifi" ADD CONSTRAINT "Notifi_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "Promo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifi" ADD CONSTRAINT "Notifi_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
