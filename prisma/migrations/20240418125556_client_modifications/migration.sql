/*
  Warnings:

  - Added the required column `updateAt` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    MODIFY `age` VARCHAR(191) NOT NULL;
