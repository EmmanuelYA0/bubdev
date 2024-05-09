"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/products/ProductColumns";
import { CartProductsInterface } from '@/lib/constants';
import Loading from '@/app/loading';


const ProductsPage = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<CartProductsInterface[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="px-10 py-5 mt-20">
      <div className="flex items-center justify-between">
        <p className="font-bold text-xl">Produits</p>
        <Button
          className="bg-pourpre hover:bg-redhot text-white"
          onClick={() => router.push("/admin/products/add-product")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter produit
        </Button>
      </div>
      <Separator className="bg-gray-400 my-4" />
      <DataTable columns={columns} data={products} searchKey="name" />
    </div>
  );
}


export default ProductsPage