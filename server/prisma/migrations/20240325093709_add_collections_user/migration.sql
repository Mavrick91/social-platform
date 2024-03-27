-- CreateTable
CREATE TABLE "_Collection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Collection_AB_unique" ON "_Collection"("A", "B");

-- CreateIndex
CREATE INDEX "_Collection_B_index" ON "_Collection"("B");

-- AddForeignKey
ALTER TABLE "_Collection" ADD CONSTRAINT "_Collection_A_fkey" FOREIGN KEY ("A") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Collection" ADD CONSTRAINT "_Collection_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
