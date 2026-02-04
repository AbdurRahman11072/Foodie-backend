/*
  Warnings:

  - You are about to drop the column `roles` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Customer', 'Admin', 'Vendor');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "roles",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'Customer';

-- DropEnum
DROP TYPE "Roles";
