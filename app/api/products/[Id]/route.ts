

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string().min(10).max(900).trim(),
  img: z.string(),
  categoryId: z.number(),
  price: z.coerce.number().min(3),
  soldPrice: z.coerce.number().min(3),
  quantity: z.coerce.number().min(0.1),
});


// Methode GET pour recuperer les donnees
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




// Methode POST pour modifier des donnees

export async function POST(request: Request, { params }: { params: { Id: string } }) {
  try {
    const Id = parseInt(params.Id, 10);
    const body = await request.json();
    const { name, description, img, categoryId, price, soldPrice, quantity } = ProductSchema.parse(body);

    // Vérifier si le produit existe
    const product = await prisma.product.findUnique({
      where: {
        id: Id,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
    }

    // Mettre à jour le produit
    const updatedProduct = await prisma.product.update({
      where: {
        id: Id,
      },
      data: {
        name,
        description,
        img,
        categoryId,
        price,
        soldPrice,
        quantity,
      },
    });

    return NextResponse.json({ product: updatedProduct, status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Methode DELETE pour supprimer des donnees si elles existes

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

