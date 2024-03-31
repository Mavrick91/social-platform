-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "pictureId" INTEGER NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
