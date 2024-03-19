/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Follow` table. All the data in the column will be lost.
  - Added the required column `initiatorId` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetUserId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "initiatorId" INTEGER NOT NULL,
ADD COLUMN     "targetUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
