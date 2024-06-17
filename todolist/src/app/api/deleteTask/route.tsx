import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await req.json();
  const { id } = data;
  console.log("id from server, ", id);

  try {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return new NextResponse(JSON.stringify(task), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
