"use client"
// Se connecter

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import GoogleButton from "./GoogleButton"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  email: z.string().min(1, 'Veuillez remplir').email('Email Invalide!'),
  password: z
  .string()
  .min(1, 'Veuillez remplir')
  .min(8, 'Le mot de passe doit avoir au moins 8 caracteres')
  ,
})

export function SignInForm() {
  const { toast } = useToast()
  const router = useRouter();
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    const signInData = await signIn('credentials',{
      email: values.email,
      password: values.password,
      redirect: false
    });


    if(signInData?.error){
      toast({
        title: "Error",
        description:"Oops! Something went wrong",
        variant:"destructive",
      })
    } 
    else
    {
      router.push('/spiritueux');
      router.refresh();
    }
  }


  return (
    <div className=" bg-transparent w-[300px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-transparent">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Entrez votre mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" mt-6 mx-auto w-full bg-pourpre">
            Se connecter
          </Button>
        </form>
        <div className=" mx-auto my-4 flex w-full justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:h-px after:flex-grow after:bg-stone-400 bg-transparent">
          ou
        </div>
        <GoogleButton>
          S'inscrire avec Google
          <Image
          height={30}
          width={30}
          src='/logo-google.svg'
          alt="google"
          className=" bg-transparent"
          />
        </GoogleButton>
        <p className=" text-center text-sm text-gray-600 mt-2 bg-transparent">
          Si vous n'avez pas de compte.
          <Link className="text-blue-500 bg-transparent hover:underline" href='/register'>Inscrivez-vous</Link>
        </p>
      </Form>
    </div>
  )
}
