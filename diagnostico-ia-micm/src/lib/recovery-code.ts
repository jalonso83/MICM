import { prisma } from "./db";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Sin I, O, 0, 1 para evitar confusión

function generateCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return `MICM-${code}`;
}

export async function generateUniqueRecoveryCode(): Promise<string> {
  let code = generateCode();
  let attempts = 0;

  while (attempts < 10) {
    const existing = await prisma.diagnostic.findUnique({
      where: { recoveryCode: code },
    });
    if (!existing) return code;
    code = generateCode();
    attempts++;
  }

  // Fallback: add timestamp suffix
  return `MICM-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}
