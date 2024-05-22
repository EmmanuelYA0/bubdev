import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { UserUsername: string } }
) {
  try {
    const UserUsername = params.UserUsername;
    console.log('User username : ',UserUsername)

    const user = await prisma.user.findUnique({
      where: {
        username: UserUsername,
      },
      select : {
        username : true,
        name : true,
        email : true,
        
      }
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
