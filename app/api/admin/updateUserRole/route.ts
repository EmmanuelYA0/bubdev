import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { userId, newRole } = await request.json();

    // Mettez à jour le rôle de l'utilisateur dans la base de données
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    return NextResponse.json({ success: true, message: "Rôle mis à jour avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle de l'utilisateur :", error);
    return NextResponse.json({ success: false, message: "Erreur lors de la mise à jour du rôle" }, { status: 500 });
  }
}

export const config = {
  runtime: 'edge',
};