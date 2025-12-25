import { getPrisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const prisma = getPrisma();
  const sections = await prisma.section.findMany();
  return NextResponse.json(sections);
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) throw new Error();
    verifyToken(authHeader);
    const prisma = getPrisma();
    const { name, slug } = await req.json();
    const section = await prisma.section.create({ data: { name, slug } });
    return NextResponse.json(section);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}