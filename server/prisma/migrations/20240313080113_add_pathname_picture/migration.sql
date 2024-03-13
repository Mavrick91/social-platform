/*
  Warnings:

  - Added the required column `pathname` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "pathname" TEXT NOT NULL;
