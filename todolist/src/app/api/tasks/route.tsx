import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  // Perform your Route Handler's logic

  return NextResponse.json({ data: { messag: 12 } }, { status: 200 });
}

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await req.json();
  const { id, content, preCondition, acceptanceCriteria, date } = data;
  console.log("id from server, ", id);

  try {
    const task = await prisma.task.create({
      data: {
        id,
        userId,
        content,
        preCondition,
        acceptanceCriteria,
        date: new Date(date),
      },
    });

    return new NextResponse(JSON.stringify(task), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
