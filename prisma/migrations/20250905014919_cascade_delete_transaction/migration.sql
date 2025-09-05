/*
  Warnings:

  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_productId_fkey`;

-- DropIndex
DROP INDEX `Transaction_productId_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `stock`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
