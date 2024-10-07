/*
  Warnings:

  - You are about to drop the column `reactions` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `replies` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `channelsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Channels` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OFFLINE', 'ONLINE');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelsId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "reactions",
DROP COLUMN "replies",
ADD COLUMN     "channelId" INTEGER,
ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "channelsId",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OFFLINE';

-- DropTable
DROP TABLE "Channels";

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "emoji" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChannelToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_messageId_emoji_key" ON "Reaction"("messageId", "emoji");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToUser_AB_unique" ON "_ChannelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToUser_B_index" ON "_ChannelToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
