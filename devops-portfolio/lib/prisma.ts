import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const getPrisma = () => {
  return globalForPrisma.prisma || (globalForPrisma.prisma = new PrismaClient({
    log: ["query"],
  }));
};