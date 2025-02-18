/*
  Warnings:

  - You are about to drop the column `looking_for` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "looking_for",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "goals" TEXT,
ADD COLUMN     "interests" TEXT,
ADD COLUMN     "lookingFor" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
