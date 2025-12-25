import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const resume = await prisma.resume.findFirst();
  return NextResponse.json(resume);
}

export async function POST(req: NextRequest) {
  const { fileUrl } = await req.json();
  const resume = await prisma.resume.upsert({
    where: { id: 1 },
    update: { fileUrl },
    create: { id: 1, fileUrl },
  });
  return NextResponse.json(resume);
}