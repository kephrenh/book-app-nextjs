import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: any) {
  const { id } = params;

  // Delete a book from the database
  const book = await prisma.book.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json("Deleted", { status: 200 });
}
