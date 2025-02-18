/*
  Warnings:

  - You are about to alter the column `refresh_token` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to alter the column `access_token` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to alter the column `id_token` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "refresh_token" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "access_token" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "id_token" SET DATA TYPE VARCHAR(64);
