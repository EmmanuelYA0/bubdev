import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        username?: string | null
    }
    interface AdapterUser{
        // username?: String
    }

    interface Account {}
   
    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
        user: User & {
            username: string
        }
        // token:{
        //     username?: String
        // }
  }
}
/**  The `JWT` interface can be found in the `next-auth/jwt` submodule */
 import { JWT } from "next-auth/jwt"
 import { string } from "zod"
    
   declare module "next-auth/jwt" {
     /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
     interface JWT {
       /** OpenID ID Token */
       idToken?: string
       username?: String | null
     }
   }