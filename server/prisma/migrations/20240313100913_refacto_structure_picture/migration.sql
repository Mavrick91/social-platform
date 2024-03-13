/*
  Warnings:

  - You are about to drop the column `content` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `pathname` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `data` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "content",
DROP COLUMN "pathname",
DROP COLUMN "published",
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "description" TEXT;
