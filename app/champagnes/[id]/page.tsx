'use client';

import Loading from "@/app/loading";
import { Vin } from "@/lib/constants";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus, Minus } from 'lucide-react';

interface ParamsProps {
  params: {
    id: number;
  };
}


export default function ChampagneItem({ params }: ParamsProps) {
  const [champagne, setChampagne] = useState<Vin | null>();
  // const id = params.id;


  const formatPrice = (price: number | undefined) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return ""; // Return empty string if price is undefined
  };


  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) { 
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (champagne?.quantity){
      if (quantity <= (champagne?.quantity - 1)) {
         setQuantity(quantity + 1);
      }
    }
  };


  useEffect(() => {
    const fetchChampagne = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        setChampagne(data.product);
      } catch (error) {
        console.error("Error fetching champagne in ChampagneItem:", error);
      }
    };

    fetchChampagne();
  }, [params.id]);

  return (
    <section className=" w-full h-[1024px]">
      <div className=" flex justify-center items-center mt-40 ">
        {champagne ? (
          <div className=" flex gap-4 w-full max-lg:flex-col">
            <div className=" w-1/2 h-[430px] min-h-60 max-lg:w-full rounded-sm flex justify-center items-center">
              {champagne.img ? (
                <Image
                  width={300}
                  height={300}
                  alt={champagne.name}
                  src={champagne.img}
                  className=" h-full w-full object-contain transition-transform duration-300 transform hover:scale-110"
                />
              ) : (
                <Loading />
              )
              }

            </div>
            <div className=" flex flex-col gap-7 p-10 rounded-md w-full  drop-shadow-2xl">
              <h1 className="text-3xl font-[Montserrat] text-redhot font-bold">
                {champagne.name}
              </h1>
              <p className="text-2xl font-medium font-[Cormorant]">
                {champagne.description}
              </p>
              <p className="text-3xl text-redhot font-[Cormorant] font-normal ">
                {formatPrice(champagne.price)} FCFA
              </p>
              <div className=" w-full flex gap-4">
                <div className="flex items-center gap-1">
                  <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={decreaseQuantity}>
                    <Minus className=" bg-slate-300 rounded-sm h-6 w-6"/>
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    readOnly
                  />

                  <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={increaseQuantity}>
                    <Plus className=" bg-slate-300 rounded-sm h-6 w-6"/>
                  </button>
                </div>
              <a href="#" className="hover:border-blue-400 w-60 flex items-center justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot">
                <svg width="24" height="24" viewBox="0 0 24 24" className="mr-2 h-6 w-6 bg-transparent stroke-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16.0001H15.2632C19.7508 16.0001 20.4333 13.1809 21.261 9.06916C21.4998 7.8832 21.6192 7.29022 21.3321 6.89515C21.1034 6.58048 20.7077 6.51645 20 6.50342" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9 6.5H17M13 10.5V2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10.5" cy="20.5" r="1.5" stroke="white" strokeWidth="1.5" />
                  <circle cx="17.5" cy="20.5" r="1.5" stroke="white" strokeWidth="1.5" />
                </svg>
                Ajouter au panier
              </a>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
