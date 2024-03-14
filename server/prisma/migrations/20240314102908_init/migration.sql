/*
  Warnings:

  - Added the required column `fileName` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "fileName" TEXT NOT NULL;
