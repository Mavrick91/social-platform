/*
  Warnings:

  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "name" TEXT NOT NULL;
