import { PrismaClient } from "@/lib/generated/prisma";

export interface IPrismaContext{
    prisma: PrismaClient
}