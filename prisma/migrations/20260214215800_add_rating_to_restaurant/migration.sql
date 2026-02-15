/*
  Warnings:

  - Added the required column `rating` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "rating" INTEGER NOT NULL;
