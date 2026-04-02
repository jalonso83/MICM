-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "nombre" TEXT,
    "sector" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "zona" TEXT NOT NULL,
    "numEmpleados" TEXT NOT NULL,
    "anosOperacion" TEXT NOT NULL,
    "ingresosMensuales" TEXT NOT NULL,
    "formalizacion" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "edad" TEXT NOT NULL,
    "nivelEducativo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnostic" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "scoreS1" INTEGER NOT NULL,
    "scoreS2" INTEGER NOT NULL,
    "scoreS3" INTEGER NOT NULL,
    "scoreS4" INTEGER NOT NULL,
    "scoreS5" INTEGER NOT NULL,
    "scoreS6" INTEGER NOT NULL,
    "scoreS7" INTEGER NOT NULL,
    "scoreS8" INTEGER NOT NULL,
    "scoreS9" INTEGER NOT NULL,
    "normS1" DOUBLE PRECISION NOT NULL,
    "normS2" DOUBLE PRECISION NOT NULL,
    "normS3" DOUBLE PRECISION NOT NULL,
    "normS4" DOUBLE PRECISION NOT NULL,
    "normS5" DOUBLE PRECISION NOT NULL,
    "normS6" DOUBLE PRECISION NOT NULL,
    "normS7" DOUBLE PRECISION NOT NULL,
    "normS8" DOUBLE PRECISION NOT NULL,
    "normS9" DOUBLE PRECISION NOT NULL,
    "imiaScore" DOUBLE PRECISION NOT NULL,
    "maturityLevel" TEXT NOT NULL,
    "maturityNumeric" INTEGER NOT NULL,
    "overridesApplied" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diagnostic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" TEXT NOT NULL,
    "diagnosticId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "modelUsed" TEXT NOT NULL DEFAULT 'claude-sonnet-4-20250514',
    "promptTokens" INTEGER,
    "outputTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_diagnosticId_key" ON "Roadmap"("diagnosticId");

-- AddForeignKey
ALTER TABLE "Diagnostic" ADD CONSTRAINT "Diagnostic_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "Diagnostic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
