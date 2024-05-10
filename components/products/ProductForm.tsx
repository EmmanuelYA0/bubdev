"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom-ui/Delete";
import Loading from "@/app/loading";
import ImageUpload from "../custom-ui/ImageUpload";
import CategorySelect from "../admin/categorySelect";

const formSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string().min(10).max(900).trim(),
  img: z.string(),
  categoryId: z.number(),
  price: z.coerce.number().min(3),
  soldPrice: z.coerce.number().min(3),
  quantity: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: CartProducts | null; //Must have "?" to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      initialData
        ? {
          ...initialData,

        }
        :
        {
          name: "",
          description: "",
          img: "",
          categoryId: 1,
          price: 500,
          soldPrice: 500,
          quantity: 1,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const newValues = {
    //   ...values,
    //   price: parseFloat(values.price),
    //   soldPrice: parseFloat(values.soldPrice),
    // };
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData.id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "admin/products";
        router.push("admin/products");
      }
    } catch (err) {
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  // return loading ? (
  //   <Loading />
  // ) :
  return (
    <div className="p-10 mt-20">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-3xl/none font-bold">Editer Produit</p>
          <Delete id={initialData.id as unknown as string} item="produit" />
        </div>
      ) : (
        <p className=" text-3xl/none font-bold">Ajouter nouveau produit</p>
      )}
      <Separator className="bg-gray-600 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                  className="placeholder:text-gray-400"
                    placeholder="Nom"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="border-gray-200 bg-white placeholder:text-gray-400"
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-3 gap-8 ">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix (CFA)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="soldPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix promo (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prix promo"
                      type="number"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <CategorySelect value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantite</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

          </div>

          <div className="flex gap-10 mt-20">
            <Button
              type="button"
              variant='outline'
              onClick={() => router.push("http://localhost:3000/admin/products")}
              className=" bg-white border border-redhot text-pourpre hover:bg-redhot hover:text-white"
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-pourpre hover:bg-redhot text-white">
              Créer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
