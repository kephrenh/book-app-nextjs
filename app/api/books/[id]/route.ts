import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Get the book with the given id
  const book = await prisma.book.findUnique({ where: { id: id } });

  return NextResponse.json(book, { status: 200 });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, author } = await req.json();

  // Update the book with the given id
  const book = await prisma.book.update({
    where: { id: id },
    data: { title: title, author: author },
  });

  return NextResponse.json(book, { status: 200 });
}

// DELETE method to delete a book
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Delete the book with the given id
  const book = await prisma.book.delete({ where: { id: id } });

  return NextResponse.json(book, { status: 200 });
}
