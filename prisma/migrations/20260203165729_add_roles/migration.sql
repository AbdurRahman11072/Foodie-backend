/*
  Warnings:

  - The `roles` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Customer', 'Seller', 'Admin');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "roles",
ADD COLUMN     "roles" "Roles" NOT NULL DEFAULT 'Customer';
