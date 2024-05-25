"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { PenBox } from "lucide-react";
import { FormError } from "../form/form-error";

const passwordFormSchema = z
  .object({
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
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    path: ["confirm_new_password"],
    message: "Les mots de passe ne correspondent pas !!",
  });

export default function EditPasswordForm() {
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const { data: session } = useSession();
  const userUsername = session?.user.username;
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
    try {
      const response = await fetch(
        `/api/user/edit-password?userUsername=${userUsername}`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (response.ok) {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          toast.success("Mot de passe mis à jour avec succès");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Quelque chose n'a pas fonctionné ! Veuillez réessayer.");
    }
  };
  
  if (!session) {
    return (
      <p className=" flex items-center justify-center text-3xl text-red-500 h-screen">
        Vous devez être authentifié pour accéder à cette page !!{" "}
      </p>
    );
  }

  return (
    <div className="flex flex-col top-28 w-[850px] mb-[200px] mx-auto space-y-5 text-gray-700 bg-white rounded-md border px-20 py-20 border-slate-50 shadow-sm">
      <h1 className="text-2xl font-bold -mt-5 mb-12 ml-5">
        Changer le mot de passe
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="current_password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel className="text-lg mb-3">
                  Mot de passe actuel
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Entrez votre mot de passe actuel"
                    className="my-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="new_password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel className="text-lg mb-3">
                  Nouveau Mot de passe
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Entrez votre nouveau mot de passe"
                    className="my-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirm_new_password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel className="text-lg mb-3">
                  Confirmer nouveau Mot de passe
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirmez nouveau votre mot de passe"
                    className="my-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={errorMessage} />
          <Button
            type="submit"
            className="absolute right-0 w-32 bg-pourpre text-white hover:bg-redhot mt-6 "
          >
            <PenBox />
            Modifier
          </Button>
        </form>
      </Form>
    </div>
  );
}
