"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import { CircleChevronRight } from "lucide-react";
import { CartProductsInterface, Champagne } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

const Catalog = () => {
  const [Champagnes, setchampagnes] = useState<Champagne[]>([]);
  const { handleAddProductToCart, cartItems } = useCart();

  const handleAddToCart = (champagneId: number) => {
    // Trouver l'objet champagne correspondant à l'ID
    const champagne = Champagnes.find((c) => c.id === champagneId);

    if (champagne) {
      if (cartItems) {
        const existingCartItemIndex = cartItems.findIndex(
          (item) => item.id === champagne.id
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
            id: champagne.id,
            name: champagne.name,
            description: champagne.description,
            price: champagne.price,
            soldPrice: champagne.soldPrice,
            img: champagne.img,
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
          id: champagne.id,
          name: champagne.name,
          description: champagne.description,
          price: champagne.price,
          soldPrice: champagne.soldPrice,
          img: champagne.img,
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
      console.error(`Champagne avec l'ID ${champagneId} non trouvé.`);
    }
  };

  useEffect(() => {
    const fetchChampagnes = async () => {
      try {
        const response = await fetch("/api/champagnes");
        const data = await response.json();
        setchampagnes(data.champagnes);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching champagnes:", error);
      }
    };

    fetchChampagnes();
  }, []);

  return (
    <section className="mt-96 w-full h-[800px]">
      <h1 className="font-[Cormorant] pb-8 text-6xl font-medium mb-16 text-myblack">
        Notre Catalogue
      </h1>
      <div className="swiper-button-prev bg-transparent text-red-600 stroke-green-600"></div>
      <div className="swiper-button-next bg-transparent"></div>

      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView={3}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className=" bg-transparent"
      >
        <SwiperSlide className="grid  lg:grid-cols-3 justify-center">
          <div className="group border-gray-100/30 flex w-full max-w-xs min-h-[530px] flex-col self-center overflow-hidden rounded-3xl border bg-rock-800 shadow-md mb-2">
            <a
              className="relative  mx-3 mt-3 bg-coolbg flex h-60 overflow-hidden rounded-2xl"
              href="champagnes/48"
            >
              <Image
                src="/champagne-imgs/moet-chandon-dom-perignon-2010.png"
                alt="bottle1"
                width={500}
                height={500}
                className="peer absolute bg-coolbg top-0 right-0 h-full w-full object-contain"
              />
              <Image
                src="/champagne-imgs/moet.png"
                alt="bottle3"
                width={480}
                height={480}
                className="peer peer-hover:right-0 bg-coolbg absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0"
              />
              <span className="absolute top-0 left-0 m-2 font-[Montaga] rounded-full bg-[#D9D9D9] px-2 text-center text-sm font-medium text-myblack">
                TOP Ventes
              </span>
            </a>
            <div className="mt-4 px-5 pb-5 bg-transparent">
              <a href="#">
                <h5 className="text-xl tracking-tight text-white bg-transparent">
                  Moët & Chandon Impérial - Brut Champagne (750ml)
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center bg-transparent justify-between">
                <p className=" bg-transparent">
                  <span className="text-xl font-bold text-white  bg-transparent">
                    120.000 FCFA
                  </span>
                  <span className="text-sm text-white line-through bg-transparent">
                    184.000 FCFA
                  </span>
                </p>
              </div>
              <a
                onClick={() => handleAddToCart(48)}
                className="hover:border-white/40 flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot"
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
        </SwiperSlide>
        <SwiperSlide className="grid  lg:grid-cols-3 justify-center">
          <div className="group border-gray-100/30 flex w-full max-w-xs min-h-[530px] flex-col self-center overflow-hidden rounded-3xl border bg-rock-800 shadow-md mb-2">
            <a
              className="relative mx-3 mt-3 bg-coolbg flex h-60 overflow-hidden rounded-2xl"
              href="champagnes/36"
            >
              <Image
                src="/champagne-imgs/veuve-clicquot-champagne-sparkling-veuve-clicquot-yellow-lab.jpg"
                alt="bottle1"
                width={352}
                height={352}
                className="peer absolute top-0 bg-coolbg right-0 h-full w-full object-contain"
              />
              <Image
                src="/champagne-imgs/bottle3.svg"
                alt="bottle3"
                width={100}
                height={200}
                className="peer peer-hover:right-0 bg-coolbg absolute top-0 -right-96 h-full w-full object-fill transition-all delay-100 duration-1000 hover:right-0"
              />
              <span className="absolute top-0 left-0 m-2 font-[Montaga] rounded-full bg-[#D9D9D9] px-2 text-center text-sm font-medium text-myblack">
                TOP Ventes
              </span>
            </a>
            <div className="mt-4 px-5 pb-5 bg-transparent">
              <a href="#">
                <h5 className="text-xl tracking-tight text-white bg-transparent">
                  Veuve Clicquot - Brut Label Champagne (750ml)
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center bg-transparent justify-between">
                <p className=" bg-transparent">
                  <span className="text-xl font-bold text-white  bg-transparent">
                    400.000FCFA
                  </span>
                  <span className="text-sm text-white line-through bg-transparent">
                    450.000FCFA
                  </span>
                </p>
              </div>
              <a
                onClick={() => handleAddToCart(36)}
                className=" cursor-pointer hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot"
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
        </SwiperSlide>
        <SwiperSlide className="grid  lg:grid-cols-3 justify-center">
          <div className="group border-gray-100/30 flex w-full max-w-xs min-h-[530px] flex-col self-center overflow-hidden rounded-3xl border bg-rock-800 shadow-md mb-2">
            <a
              className="relative mx-3 mt-3 bg-coolbg flex h-60 overflow-hidden rounded-2xl"
              href="champagnes/49"
            >
              <Image
                src="/champagne-imgs/perrier-jouet-belle-epoque-champagne.png"
                alt="bottle1"
                width={750}
                height={750}
                className="peer absolute top-0 bg-coolbg right-0 h-full w-full object-contain"
              />
              <Image
                src="/champagne-imgs/champagne-perrier-jouet-belle-epoque-2014.png"
                alt="bottle3"
                width={400}
                height={400}
                className="peer peer-hover:right-0 bg-coolbg absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0"
              />
              <span className="absolute top-0 left-0 m-2 font-[Montaga] bg-[#D9D9D9] rounded-full px-2 text-center text-sm font-medium text-myblack">
                TOP Ventes
              </span>
            </a>
            <div className="mt-4 px-5 pb-5 bg-transparent">
              <a href="#">
                <h5 className="text-xl tracking-tight text-white bg-transparent">
                  Perrier-Jouët Belle Époque Blanc de Blancs 2012
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center bg-transparent justify-between">
                <p className=" bg-transparent">
                  <span className="text-xl font-bold text-white  bg-transparent">
                    27.500 FCFA
                  </span>
                  <span className="text-sm text-white line-through bg-transparent">
                    29.500 FCFA
                  </span>
                </p>
              </div>
              <a
                onClick={() => handleAddToCart(49)}
                className="cursor-pointer hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot"
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
        </SwiperSlide>
        <SwiperSlide className="grid  lg:grid-cols-3 justify-center">
          <div className="group border-gray-100/30 flex w-full max-w-xs min-h-[530px] flex-col self-center overflow-hidden rounded-3xl border bg-rock-800 shadow-md mb-2">
            <a
              className="relative mx-3 mt-3 flex h-60 bg-coolbg overflow-hidden rounded-2xl"
              href="champagnes/47"
            >
              <Image
                src="/champagne-imgs/LouisRoedererCristal.png"
                alt="bottle1"
                width={406}
                height={614}
                className="peer absolute top-0 right-0 bg-coolbg h-full w-full object-contain"
              />
              <Image
                src="/champagne-imgs/louis-roederer-cristal-2012.png"
                alt="bottle2"
                width={500}
                height={500}
                className="peer peer-hover:right-0 absolute top-0 bg-coolbg -right-96 h-full w-full object-fill transition-all delay-100 duration-1000 hover:right-0"
              />
              <span className="absolute top-0 left-0 m-2 font-[Montaga] bg-[#D9D9D9] rounded-full  px-2 text-center text-sm font-medium text-myblack">
                TOP Ventes
              </span>
            </a>
            <div className="mt-4 px-5 pb-5 bg-transparent">
              <a href="#">
                <h5 className="text-xl tracking-tight text-white bg-transparent">
                  Louis Roederer Cristal - Brut Champagne(750ml)
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center bg-transparent justify-between">
                <p className=" bg-transparent">
                  <span className="text-xl font-bold text-white  bg-transparent">
                    32.900 FCFA
                  </span>
                  <span className="text-xs text-white line-through bg-transparent">
                    34.900 FCFA
                  </span>
                </p>
              </div>
              <a
                onClick={() => handleAddToCart(47)}
                className=" cursor-pointer hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot"
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
        </SwiperSlide>
        <SwiperSlide className="grid  lg:grid-cols-3 justify-center">
          <div className="group border-gray-100/30 flex w-full max-w-xs min-h-[530px] flex-col self-center overflow-hidden rounded-3xl border bg-rock-800 shadow-md mb-2">
            <a
              className="relative mx-3 mt-3 flex h-60 bg-coolbg overflow-hidden rounded-2xl"
              href="champagnes/32"
            >
              <Image
                src="/champagne-imgs/dom-perignon-p2-2002.png"
                alt="bottle1"
                width={458}
                height={533}
                className="peer absolute top-0 right-0 bg-coolbg h-full w-full object-contain"
              />
              <Image
                src="/champagne-imgs/domperignonrose.png"
                alt="bottle3"
                width={384}
                height={650}
                className="peer peer-hover:right-0 absolute bg-coolbg top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0"
              />
              <span className="absolute top-0 left-0 m-2 font-[Montaga] bg-[#D9D9D9] rounded-full  px-2 text-center text-sm font-medium text-myblack">
                TOP Ventes
              </span>
            </a>
            <div className="mt-4 px-5 pb-5 bg-transparent">
              <a href="#">
                <h5 className="text-xl tracking-tight text-white bg-transparent">
                  Dom Pérignon P2 Plénitude - Brut Champagne (750ml)
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center bg-transparent justify-between">
                <p className=" bg-transparent">
                  <span className="text-xl font-bold text-white  bg-transparent">
                    27.500 FCFA
                  </span>
                  <span className="text-xs text-white line-through bg-transparent">
                    29.500 FCFA
                  </span>
                </p>
              </div>
              <a
                onClick={() => handleAddToCart(32)}
                className=" cursor-pointer hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot"
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
        </SwiperSlide>
      </Swiper>

      <div className="flex flex-row items-center justify-center mt-8">
        <a
          href="/champagnes"
          className="hover:bg-rock-700 flex flex-row  w-36 rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 items-center text-sm  text-white focus:outline-none focus:ring-4"
        >
          Voir plus
          <CircleChevronRight className="bg-transparent stroke-white" />
        </a>
      </div>
    </section>
  );
};

export default Catalog;
