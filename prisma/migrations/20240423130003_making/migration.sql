/*
  Warnings:

  - You are about to drop the column `updateAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `updateAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `username` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;
