

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { Id: string } }) {
  try {
    const Id = parseInt(params.Id, 10);
    const product = await prisma.product.findUnique({
      where: {
        id: Id,
      },
    });
    if (!product) {
      return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
      
    }

    return NextResponse.json({ product, status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request, { params }: { params: { Id: string } }) {
  try {
    const { Id } = params;

    // Vérifier si le produit existe
    const product = await prisma.product.findUnique({
      where: { id: Number(Id) },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer le produit
    await prisma.product.delete({
      where: { id: Number(Id) },
    });

    return NextResponse.json(
      { message: "Produit supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression du produit" },
      { status: 500 }
    );
  }
}

