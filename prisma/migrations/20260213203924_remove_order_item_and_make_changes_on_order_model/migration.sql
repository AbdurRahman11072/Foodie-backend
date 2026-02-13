/*
  Warnings:

  - You are about to drop the column `deliveryAddress` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderTime` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `Order_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuItemId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PREPARING', 'READY', 'DELIVERED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ORDERD', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Order_items" DROP CONSTRAINT "Order_items_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "Order_items" DROP CONSTRAINT "Order_items_orderId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "deliveryAddress",
DROP COLUMN "orderTime",
DROP COLUMN "paymentMethod",
DROP COLUMN "totalAmount",
ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'PREPARING',
ADD COLUMN     "menuItemId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- DropTable
DROP TABLE "Order_items";

-- DropEnum
DROP TYPE "orderStatus";

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "Menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
