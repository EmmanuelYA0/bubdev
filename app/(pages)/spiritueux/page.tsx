// app/spiritueux/page.tsx

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./spiritueux.module.css";
import SkeletonCard from "@/components/SkeletonCard";
import { CartProductsInterface, SpiritueuxInterface } from "@/lib/constants";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import HeroSlider from "@/components/layout/HeroSlider";

export default function Spiritueux() {
  const [spiritueux, setSpiritueux] = useState<SpiritueuxInterface[]>([]);
  const [isloading, setLoading] = useState(true);
  const { handleAddProductToCart, cartItems } = useCart();

  const handleAddToCart = (spiritueux: SpiritueuxInterface) => {
    // Vérifier si cartItems est null avant de l'utiliser
    if (cartItems) {
      const existingCartItemIndex = cartItems.findIndex(
        (item) => item.id === spiritueux.id
      );

      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        let newQuantity = updatedCartItems[existingCartItemIndex].quantity;
        if (newQuantity) {
          newQuantity += 1;
          updatedCartItems[existingCartItemIndex].quantity = newQuantity;
          toast.success(
            "Quantité du produit mise à jour dans le panier avec succès",
            {
              duration: 1500,
              style: {
                backgroundColor: "#fff",
                color: "#000",
              },
              iconTheme: {
                primary: "#4caf50",
                secondary: "#fff",
              },
            }
          );
        }
      } else {
        // Si le produit n'est pas encore dans le panier
        const cartProduct: CartProductsInterface = {
          id: spiritueux.id,
          name: spiritueux.name,
          description: spiritueux.description,
          price: spiritueux.price,
          soldPrice: spiritueux.soldPrice,
          img: spiritueux.img,
          quantity: 1,
        };

        handleAddProductToCart(cartProduct);
        toast.success("Produit ajouté au panier avec succès", {
          duration: 1000,
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
          iconTheme: {
            primary: "#4caf50",
            secondary: "#fff",
          },
        });
      }
    } else {
      // Si le panier est vide
      const cartProduct: CartProductsInterface = {
        id: spiritueux.id,
        name: spiritueux.name,
        description: spiritueux.description,
        price: spiritueux.price,
        soldPrice: spiritueux.soldPrice,
        img: spiritueux.img,
        quantity: 1,
      };

      handleAddProductToCart(cartProduct);
      toast.success("Produit ajouté au panier avec succès", {
        duration: 1000,
        style: {
          backgroundColor: "#fff",
          color: "#000",
        },
        iconTheme: {
          primary: "#4caf50",
          secondary: "#fff",
        },
      });
    }
  };

  const formatPrice = (price: number | undefined) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return ""; // Return empty string if price is undefined
  };

  useEffect(() => {
    const fetchSpiritueux = async () => {
      try {
        const response = await fetch("/api/spiritueux");
        const data = await response.json();
        setSpiritueux(data.spiritueux);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching spiritueux:", error);
      }
    };

    fetchSpiritueux();
  }, []);

  return (
    <>
      <HeroSlider/>
      <h1 className={`${styles.Produits_texte} top-20 `}>
        Nos meilleurs spiritueux pour votre plaisir
      </h1>
      <section className={styles.section_produits}>
        {isloading ? (
          <div className=" grid grid-cols-3 justify-center items-center">
            {"012345678".split("").map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className={styles.produits}>
            {spiritueux.map((spiritueux, index) => (
              <div className="grid justify-center ">
                <div
                  key={index}
                  className="group border-gray-100/30 flex w-full max-w-xs min-h-[490px] flex-col self-center overflow-hidden rounded-3xl border bg-rock-800 shadow-md mb-12 "
                >
                  <a
                    className="relative mx-3 bg-white mt-3 flex h-60 overflow-hidden rounded-2xl"
                    href={`spiritueux/${spiritueux.id}`}
                  >
                    <Image
                      src={spiritueux.img}
                      alt={spiritueux.name}
                      width={250}
                      height={280}
                      className="peer absolute  bg-white top-0 right-0 left-0 h-full w-full object-contain"
                    />
                    <Image
                      src={spiritueux.img}
                      alt={spiritueux.name}
                      width={250}
                      height={280}
                      className="peer peer-hover:right-0  bg-white absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0"
                    />
                  </a>
                  <div className="mt-4 px-5 pb-5 bg-transparent">
                    <a href={`spiritueux/${spiritueux.id}`}>
                      <h5 className="text-xl tracking-tight text-white bg-transparent">
                        {spiritueux.name}
                      </h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center bg-transparent justify-between">
                      <p className=" bg-transparent">
                        <span className="text-base font-bold text-white  bg-transparent">
                          {formatPrice(spiritueux.soldPrice)} FCFA
                        </span>
                        <span className="text-sm text-white line-through bg-transparent">
                          {formatPrice(spiritueux.price)} FCFA
                        </span>
                      </p>
                    </div>
                    <a
                      onClick={() => handleAddToCart(spiritueux)}
                      className="hover:border-white/40 flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="mr-2 h-6 w-6 bg-transparent stroke-white"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 16.0001H15.2632C19.7508 16.0001 20.4333 13.1809 21.261 9.06916C21.4998 7.8832 21.6192 7.29022 21.3321 6.89515C21.1034 6.58048 20.7077 6.51645 20 6.50342"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9 6.5H17M13 10.5V2.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="10.5"
                          cy="20.5"
                          r="1.5"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="17.5"
                          cy="20.5"
                          r="1.5"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Ajouter au panier
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
