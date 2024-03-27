/*
  Warnings:

  - You are about to drop the column `pictureId` on the `Collection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pictureId_fkey";

-- DropIndex
DROP INDEX "Collection_userId_pictureId_key";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "pictureId";

-- CreateTable
CREATE TABLE "PictureOnCollection" (
    "pictureId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "PictureOnCollection_pkey" PRIMARY KEY ("pictureId","collectionId")
);

-- AddForeignKey
ALTER TABLE "PictureOnCollection" ADD CONSTRAINT "PictureOnCollection_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PictureOnCollection" ADD CONSTRAINT "PictureOnCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
