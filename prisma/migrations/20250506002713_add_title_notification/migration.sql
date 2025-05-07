/*
  Warnings:

  - Added the required column `title` to the `Notifi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notifi" ADD COLUMN     "title" TEXT NOT NULL;
