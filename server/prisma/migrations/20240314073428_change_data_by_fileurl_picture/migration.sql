/*
  Warnings:

  - You are about to drop the column `data` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "data",
ADD COLUMN     "fileUrl" TEXT NOT NULL;
