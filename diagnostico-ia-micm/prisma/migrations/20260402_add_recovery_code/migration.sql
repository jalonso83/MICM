-- Add recoveryCode column with a default for existing rows
ALTER TABLE "Diagnostic" ADD COLUMN "recoveryCode" TEXT;

-- Generate recovery codes for existing rows
UPDATE "Diagnostic" SET "recoveryCode" = 'MICM-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6)) WHERE "recoveryCode" IS NULL;

-- Now make it required and unique
ALTER TABLE "Diagnostic" ALTER COLUMN "recoveryCode" SET NOT NULL;
CREATE UNIQUE INDEX "Diagnostic_recoveryCode_key" ON "Diagnostic"("recoveryCode");
