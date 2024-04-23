"use client"
// S'inscrire

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import GoogleButton from "./GoogleButton"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
// import { useState } from "react"
// import AgeCalculator from "./ageCalculator"




export const formSchema = z
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
  checkpassword: z
  .string()
  .min(1, 'Veuillez remplir')
  .min(8, 'Le mot de passe doit avoir au moins 8 caracteres')
  ,
})
.refine((data) => data.password === data.checkpassword,{
  path:['checkpassword'],
  message : 'Les mots de passe ne correspondent pas !!'
})
.refine((data) => {
  const ageInt = parseInt(data.age);
  return !isNaN(ageInt) && ageInt >= 18;
}, {
  path: ['age'],
  message: "Vous n'êtes pas majeur !!",
});

export function SignUpForm() {

  const router = useRouter();

  // ...
  // 1. Define your form.
  // const [birthdate, setBirthdate] = useState('');
  // const [realAge, setAge] = useState<string | null>(null);
  
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setBirthdate(e.target.value);
  //   // Calculer l'âge à partir de la date de naissance
  //   const today = new Date();
  //   const birthdateDate = new Date(e.target.value);
  //   const realAge = String(today.getFullYear() - birthdateDate.getFullYear());
  //   setAge(realAge);
  // };
  // const AgeNotNull = realAge !== null
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      age:"",
      gender:"none",
      password: "",
    },
  })
  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values)
  // }

  async function SubmitForm (values: z.infer<typeof formSchema>) {

    const response = await fetch('/api/user', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body : JSON.stringify({
            username : values.username,
            email : values.email,
            name : values.name,
            password : values.password,
            age : values.age,
            gender : values.gender,
        })
    })

    if (response.ok) {
        router.push('/login')
    } else {
        console.error("L'inscription a echouée")
    }
  }


  return (
    <div className=" bg-transparent w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(SubmitForm)} className=" bg-transparent">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">Nom d'utlisateur</FormLabel>
                <FormControl>
                  <Input placeholder="votre nom d'utlisateur" {...field} />
                </FormControl>
                <FormMessage className=" bg-transparent" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez votre nom" {...field}/>
                </FormControl>
                <FormMessage className=" bg-transparent" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">Age</FormLabel>
                <FormDescription className=" bg-transparent text-rose-600">Entrez votre age sous forme de nombre</FormDescription>
                <FormControl>
                  <Input placeholder="Votre Age" {...field}/>
                </FormControl>
                <FormMessage className=" bg-transparent" />
                {/* {AgeNotNull && <AgeCalculator birthdate={birthdate} />} */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage className=" bg-transparent" />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="bg-slate-200 mb-2">
              <FormLabel className=" bg-transparent">Genre</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 bg-transparent"
                >
                  <FormItem className="flex bg-transparent items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Homme"/>
                    </FormControl>
                    <FormLabel className="font-normal bg-transparent">
                    Homme
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex bg-transparent items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Femme"/>
                    </FormControl>
                    <FormLabel className="font-normal bg-transparent">
                    Femme
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex bg-transparent items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal bg-transparent">Aucun</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className=" bg-transparent" />
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
                <FormMessage className=" bg-transparent" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkpassword"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">Verification mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="RE-Entrez votre mot de passe" {...field} />
                </FormControl>
                <FormMessage className=" bg-transparent" />
              </FormItem>
            )}
          />
          <Button type="submit" className=" mt-6 mx-auto w-full bg-pourpre">
            S'inscrire
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
          Si vous avez deja un compte.
          <Link className="text-blue-500 bg-transparent hover:underline" href='/login'>Connectez-vous</Link>
        </p>
      </Form>
    </div>
  )
}
