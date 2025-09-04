/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `status` ENUM('SUCCESS', 'CANCEL') NOT NULL DEFAULT 'SUCCESS';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `isAdmin`,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('MEMBER', 'ADMIN') NOT NULL DEFAULT 'MEMBER';
