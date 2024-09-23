/*
  Warnings:

  - You are about to drop the `BannerFolder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BannerFolder" DROP CONSTRAINT "BannerFolder_bannerId_fkey";

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "BannerFolder";

-- CreateTable
CREATE TABLE "Banneritem" (
    "id" TEXT NOT NULL,
    "bannerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Banneritem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Banneritem_bannerId_key" ON "Banneritem"("bannerId");

-- AddForeignKey
ALTER TABLE "Banneritem" ADD CONSTRAINT "Banneritem_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
