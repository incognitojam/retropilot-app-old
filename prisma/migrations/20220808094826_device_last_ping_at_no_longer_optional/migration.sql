/*
  Warnings:

  - Made the column `storageUsage` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "storageUsage" SET NOT NULL,
ALTER COLUMN "storageUsage" SET DEFAULT 0,
ALTER COLUMN "lastPingAt" SET DEFAULT CURRENT_TIMESTAMP;
