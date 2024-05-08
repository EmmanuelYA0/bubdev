
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod"


const ProductsSchema = z
.object({
    name: z.string(),
    description: z.string(),
    img: z.string(),
    quantity: z.number(),
    price: z.number(),
    soldPrice: z.number(),
    categoryId: z.number(),
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, img, quantity, price, soldPrice, categoryId} = ProductsSchema.parse(body);

        const ExistingProduct = await prisma.product.findFirst({
            where : {name: name}
        });
        if (ExistingProduct) {
            return NextResponse.json({product:null, message:"Ce produit existe déja", status:409})
        }

        const newProduct = await prisma.product.create({
            data :{
                name,
                description,
                img,
                quantity,
                price,
                soldPrice,
                categoryId
            }
        })

        return NextResponse.json({product: newProduct, message: 'Produit créé avec succès'},
            {status:201}
        )
    } catch (error) {
        console.error("Erreur lors de la création du produit :", error);
        return NextResponse.json({ error: "Une erreur est survenue lors de la création du produit" }, { status: 500 });
    }
}