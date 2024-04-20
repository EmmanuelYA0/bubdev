
import { NextResponse } from "next/server";
import { z } from "zod"
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";


const clientSchema = z
.object({
    username: z.string().min(1, 'Veuillez remplir').max(100),
    name: z.string().min(1, 'Veuillez remplir'),
    email: z.string().min(1, 'Veuillez remplir').email('Email Invalide!'),
    age: z.string().min(1, 'Veuillez remplir'),
    gender: z.enum(["Homme", "Femme", "none"], {
        required_error: "Selectionner votre genre svp!",
      }),
    password: z
    .string()
    .min(1, 'Veuillez remplir')
    .min(8, 'Le mot de passe doit avoir au moins 8 caracteres')
    ,
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, username, gender,  password, name, age} = clientSchema.parse(body);

        // verifier existance client par l'email
        const ExistingClientByEmail = await prisma.client.findUnique({
            where : {email: email}
        });
        if (ExistingClientByEmail) {
            return NextResponse.json({client:null, message:"Un utilisateur avec cette email existe déja", status:409})
        }

        // verifier existance client par l'username
        const ExistingClientByUsername = await prisma.client.findUnique({
            where : {username: username}
        })

        if (ExistingClientByUsername) {
            return NextResponse.json({client:null, message:"Un utilisateur avec ce nom d'utilisateur existe déja", status:409})
        }

        const hashedPassword = await hash(password, 10)

        const newClient = await prisma.client.create({
            data :{
                username,
                name,
                age,
                gender,
                email,
                password : hashedPassword,
            }
        })
        const {password : newClientPassword, ...rest} = newClient;
        
        return NextResponse.json({client: rest, message: 'Client créé avec succès'},
            {status:201}
        )
    } catch (error) {
        return NextResponse.json({ error: 'Une erreur est survenue lors de la création du client' }, { status: 500 });
    }
}