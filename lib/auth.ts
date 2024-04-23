import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { compare } from "bcrypt";
import { signInSchema } from "@/lib/zod";


export const { handlers, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session:{
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = await signInSchema.parseAsync(credentials);

        const existingUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!existingUser) {
          return null;
        }
        if (existingUser.password) {
          const passwordMatch = await compare(password, existingUser.password);
          if (!passwordMatch) {
            return null;
          }
        }



        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
        
      },
    }),
  ],
  callbacks: {
    
    async jwt({ token, user, session }) {
      // console.log('jwt callback',{ token, user, session})
      if (user) {
            return {
              ...token,
              username: user.username
            }
          }
      return token
    },
    
    async session({ session, token}) {
      // console.log('session callback',{ token, session})
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username as string,
        },
      }
    },
   
  },
});
