/*
  Warnings:

  - Changed the type of `creatorId` on the `Channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "creatorId",
ADD COLUMN     "creatorId" INTEGER NOT NULL;
