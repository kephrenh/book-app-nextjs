import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { title, author } = body;

  // save the book to database
  const post = await prisma.book.create({ data: { title, author } });
  return NextResponse.json(post, { status: 201 });
}
