import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const passwordFormSchema = z.object({
  current_password: z
    .string()
    .min(1, "Ce champ ne peut etre vide")
    .min(8, "Le mot de passe doit avoir au moins 8 caracteres"),
  new_password: z
    .string()
    .min(1, "Ce champ ne peut etre vide")
    .min(8, "Le mot de passe doit avoir au moins 8 caracteres"),
  confirm_new_password: z
    .string()
    .min(1, "Ce champ ne peut etre vide")
    .min(8, "Le mot de passe doit avoir au moins 8 caracteres"),
});

export const POST = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userUsernameParam = searchParams.get("userUsername");
  let userUsername: string | undefined = undefined;

  if (userUsernameParam !== null) {
    userUsername = userUsernameParam;
  }

  const body = await req.json();
  const { current_password, new_password, confirm_new_password } =
    passwordFormSchema.parse(body);

//   if (new_password !== confirm_new_password) {
//     return NextResponse.json({
//       error: "Les nouveaux mots de passe ne correspondent pas",
//       status: 400,
//     });
//   }

  const user = await prisma.user.findUnique({
    where: {
      username: userUsername,
    },
  });

  if (user) {
    if (user.password) {
      const passwordMatch = await compare(current_password, user.password);

      if (!passwordMatch) {
        return NextResponse.json({
          error: "Le mot de passe actuel n'est pas correct",
          status: 400,
        });
      }
    }

    const hashedPassword = await hash(new_password, 10);
    await prisma.user.update({
      where: {
        username: userUsername,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Mot de passe mis à jour avec succès",
    });
  } else {
    return NextResponse.json({
      error: "Utilisateur non trouvé",
      status: 404,
    });
  }
};