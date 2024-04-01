-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "altText" TEXT,
ADD COLUMN     "disableComments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hideLikesAndViewCounts" BOOLEAN NOT NULL DEFAULT false;
