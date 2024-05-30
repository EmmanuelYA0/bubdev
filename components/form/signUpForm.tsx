"use client";
// S'inscrire

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleButton from "./GoogleButton";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { toast } from "../ui/use-toast";
// import AgeCalculator from "./ageCalculator"

export const formSchema = z
  .object({
    username: z.string().min(1, "Veuillez remplir").max(100),
    name: z.string().min(1, "Veuillez remplir"),
    email: z.string().min(1, "Veuillez remplir").email("Email Invalide!"),
    age: z.string().min(1, "Veuillez remplir"),
    gender: z.enum(["Homme", "Femme", "none"], {
      required_error: "Selectionner votre genre svp!",
    }),
    password: z
      .string()
      .min(1, "Veuillez remplir")
      .min(8, "Le mot de passe doit avoir au moins 8 caracteres"),
    checkpassword: z
      .string()
      .min(1, "Veuillez remplir")
      .min(8, "Le mot de passe doit avoir au moins 8 caracteres"),
  })
  .refine((data) => data.password === data.checkpassword, {
    path: ["checkpassword"],
    message: "Les mots de passe ne correspondent pas !!",
  })
  .refine(
    (data) => {
      const ageInt = parseInt(data.age);
      return !isNaN(ageInt) && ageInt >= 18;
    },
    {
      path: ["age"],
      message: "Vous n'êtes pas majeur !!",
    }
  );

export function SignUpForm() {
  const router = useRouter();

  const [IsLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      age: "",
      gender: "none",
      password: "",
    },
  });

  async function SubmitForm(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          name: values.name,
          password: values.password,
          age: values.age,
          gender: values.gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.error) {
          setErrorMessage(data.error);
          setIsLoading(false);
        } else if (data.message) {
          setSuccessMessage(data.message);

          toast({
            title: "Succès",
            description: "Inscription réussie",
            variant: "destructive",
            className: "bg-emerald-100  border-emerald-500",
          });
          router.push("/login");
        }
      } else {
        setErrorMessage(
          data.error || "Une erreur est survenue lors de l'inscription"
        );
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de l'inscription");
      console.error("Une erreur est survenue lors de l'inscription :", error);
      setIsLoading(false);
    }
  }

  return (
    <div className=" bg-transparent w-[400px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitForm)}
          className=" bg-transparent"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="bg-slate-200 mb-2">
                <FormLabel className=" bg-transparent">
                  Nom d'utlisateur
                </FormLabel>
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
                  <Input placeholder="Entrez votre nom" {...field} />
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
                <FormDescription className=" bg-transparent text-sky-400">
                  * Entrez votre age sous forme de nombre
                </FormDescription>
                <FormControl>
                  <Input placeholder="Votre Age" {...field} />
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
                        <RadioGroupItem value="Homme" />
                      </FormControl>
                      <FormLabel className="font-normal bg-transparent">
                        Homme
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex bg-transparent items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Femme" />
                      </FormControl>
                      <FormLabel className="font-normal bg-transparent">
                        Femme
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex bg-transparent items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel className="font-normal bg-transparent">
                        Ne pas préciser
                      </FormLabel>
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
                  <div className=" rounded w-full right-2 bg-transparent">
                    <Input
                      type={passwordShown ? "text" : "password"}
                      placeholder="Entrez votre mot de passe"
                      {...field}
                    />
                    <i
                      className=" absolute top-2 right-2 bg-transparent cursor-pointer"
                      onClick={togglePasswordVisiblity}
                    >
                      {passwordShown ? (
                        <EyeOff
                          size={24}
                          className="bg-transparent hover:stroke-blue-400"
                        />
                      ) : (
                        <Eye
                          size={24}
                          className=" bg-transparent hover:stroke-blue-400"
                        />
                      )}
                    </i>{" "}
                  </div>
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
                <FormLabel className=" bg-transparent">
                  Verification mot de passe
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Entrez à nouveau votre mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" bg-transparent" />
              </FormItem>
            )}
          />
          {errorMessage && !successMessage ? (
            <FormError message={errorMessage} />
          ) : (
            <FormSuccess message={successMessage} />
          )}

          <Button
            type="submit"
            disabled={IsLoading}
            className={`mt-6 mx-auto w-full bg-pourpre`}
          >
            {IsLoading ? (
              <>
                <span className="flex items-center justify-center">
                  <span className="mr-2">Chargement</span>
                  <span className="animate-spin">
                    <LoaderCircleIcon className="w-5 h-5" />
                  </span>
                </span>
              </>
            ) : (
              "S'inscrire"
            )}
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
            src="/logo-google.svg"
            alt="google"
            className=" bg-transparent"
          />
        </GoogleButton>
        <p className=" text-center text-sm text-gray-600 mt-2 bg-transparent">
          Si vous avez deja un compte.
          <Link
            className="text-blue-500 bg-transparent hover:underline"
            href="/login"
          >
            Connectez-vous
          </Link>
        </p>
      </Form>
    </div>
  );
}
