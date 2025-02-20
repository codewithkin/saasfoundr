-- AlterTable
ALTER TABLE "SaaSProduct" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "users" SET DEFAULT 0,
ALTER COLUMN "mrr" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "SaaSProduct_user_id_idx" ON "SaaSProduct"("user_id");

-- CreateIndex
CREATE INDEX "SaaSProduct_createdAt_idx" ON "SaaSProduct"("createdAt");
