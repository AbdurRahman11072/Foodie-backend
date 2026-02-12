/*
  Warnings:

  - You are about to drop the column `menuid` on the `Menu_items` table. All the data in the column will be lost.
  - You are about to drop the `Menus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `calories` to the `Menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cuisine` to the `Menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryTime` to the `Menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `Menu_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Menu_items" DROP CONSTRAINT "Menu_items_menuid_fkey";

-- DropForeignKey
ALTER TABLE "Menus" DROP CONSTRAINT "Menus_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Menu_items" DROP COLUMN "menuid",
ADD COLUMN     "allergens" TEXT[],
ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "cuisine" TEXT NOT NULL,
ADD COLUMN     "deliveryTime" TEXT NOT NULL,
ADD COLUMN     "ingredients" TEXT[],
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "restaurantId" TEXT NOT NULL,
ADD COLUMN     "servingSize" TEXT NOT NULL;

-- DropTable
DROP TABLE "Menus";

-- AddForeignKey
ALTER TABLE "Menu_items" ADD CONSTRAINT "Menu_items_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
