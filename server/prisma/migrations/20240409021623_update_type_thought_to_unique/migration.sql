/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Thought` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Thought_userId_key" ON "Thought"("userId");
