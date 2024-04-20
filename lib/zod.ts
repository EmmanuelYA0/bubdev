import { z } from "zod"
 
export const signInSchema = z.object({
    email: z.string().min(1, 'Veuillez remplir').email('Email Invalide!'),
    password: z.string().min(1, 'Veuillez remplir').min(8, 'Le mot de passe doit avoir au moins 8 caracteres'),
})