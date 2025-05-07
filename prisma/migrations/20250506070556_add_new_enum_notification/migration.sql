/*
  Warnings:

  - The values [PaymentUpdate] on the enum `NotificationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationStatus_new" AS ENUM ('UserPaymentPending', 'UserPaymentConfirmed', 'UserPaymentFailed', 'AdminPaymentReceived', 'AdminPaymentConfirmed', 'Promo', 'Coupon', 'OrderPending', 'OrderShipped', 'OrderCanceled', 'OrderReceived', 'Rating', 'ComplaintFiled', 'ComplaintResponded');
ALTER TABLE "Notifi" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Notifi" ALTER COLUMN "status" TYPE "NotificationStatus_new" USING ("status"::text::"NotificationStatus_new");
ALTER TYPE "NotificationStatus" RENAME TO "NotificationStatus_old";
ALTER TYPE "NotificationStatus_new" RENAME TO "NotificationStatus";
DROP TYPE "NotificationStatus_old";
ALTER TABLE "Notifi" ALTER COLUMN "status" SET DEFAULT 'OrderPending';
COMMIT;
