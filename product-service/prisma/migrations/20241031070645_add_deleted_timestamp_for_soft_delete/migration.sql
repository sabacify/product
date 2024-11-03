/*
  Warnings:

  - You are about to drop the column `active` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,deleted]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_name_active_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "active",
ADD COLUMN     "deleted" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_deleted_key" ON "Product"("name", "deleted");
