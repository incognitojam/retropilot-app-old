/*
  Warnings:

  - Made the column `nickname` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imei` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serial` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deviceType` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publicKey` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "nickname" SET NOT NULL,
ALTER COLUMN "imei" SET NOT NULL,
ALTER COLUMN "serial" SET NOT NULL,
ALTER COLUMN "deviceType" SET NOT NULL,
ALTER COLUMN "publicKey" SET NOT NULL;
