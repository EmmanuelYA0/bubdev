
import { NextResponse } from "next/server";
import { z } from "zod"
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";


const UserSchema = z
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
        const {email, username, gender,  password, name, age} = UserSchema.parse(body);

        // verifier existance User par l'email
        const ExistingUserByEmail = await prisma.user.findUnique({
            where : {email: email}
        });
        if (ExistingUserByEmail) {
            return NextResponse.json({user:null, message:"Un utilisateur avec cette email existe déja", status:409})
        }

        // verifier existance User par l'username
        const ExistingUserByUsername = await prisma.user.findUnique({
            where : {username: username}
        })

        if (ExistingUserByUsername) {
            return NextResponse.json({user:null, message:"Un utilisateur avec ce nom d'utilisateur existe déja", status:409})
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data :{
                username,
                name,
                age,
                gender,
                email,
                password : hashedPassword,
            }
        })
        const {password : newUserPassword, ...rest} = newUser;
        
        return NextResponse.json({user: rest, message: 'Utilisateur créé avec succès'},
            {status:201}
        )
    } catch (error) {
        return NextResponse.json({ error: "Une erreur est survenue lors de la création de l'utilisateur" }, { status: 500 });
    }
}