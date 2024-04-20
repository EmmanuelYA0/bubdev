import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import { compare } from "bcrypt"
import { signInSchema } from "@/lib/zod"



export const { handlers, auth} = NextAuth({
  pages: {
    signIn : '/login'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider,
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials){
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const { email, password } = await signInSchema.parseAsync(credentials)
  
          const existingClient = await prisma.client.findUnique({
            where: { email : email}
            }
          )
  
          if (!existingClient){
            return null;
          }
  
          const passwordMatch = await compare(password, existingClient.password)
          
          if (!passwordMatch){
            return null;
          }
  
          return{
            id : `${existingClient.id}`,
            username : existingClient.username,
            email : existingClient.email
          } 
      }
    })
  ],
})