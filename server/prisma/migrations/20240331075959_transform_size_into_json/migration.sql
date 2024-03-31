/*
  Warnings:

  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sizes` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_pictureId_fkey";

-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "sizes" JSONB NOT NULL;

-- DropTable
DROP TABLE "Size";
