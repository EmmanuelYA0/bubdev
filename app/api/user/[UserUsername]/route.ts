import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { UserUsername: string } }
) {
  try {
    const UserUsername = params.UserUsername;

    const user = await prisma.user.findUnique({
      where: {
        username: UserUsername,
      },
      select: {
        username: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    return NextResponse.json({ user, status: 200 });
  } catch (error) {
    console.error("Error fetching user", error);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { UserUsername: string } }
) {
  const UserFormSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
  });

  try {
    const UserUsername = params.UserUsername;
    const body = await req.json();
    const { name, username, email } = UserFormSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        username: UserUsername,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        username: UserUsername,
      },
      data: {
        name: name,
        username: username,
        email: email,
      },
    });

    return NextResponse.json({ updatedUser, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server Error", status: 500 });
  }
}
