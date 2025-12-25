import { getPrisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = getPrisma();
  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section");
  const projects = await prisma.project.findMany({
    where: section ? { section: { slug: section } } : {},
    include: { section: true },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) throw new Error();
    verifyToken(authHeader);
    const prisma = getPrisma();
    const body = await req.json();
    const project = await prisma.project.create({ data: body });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}