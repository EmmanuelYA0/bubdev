// app/vins/page.tsx

'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import styles from './vins.module.css'
import SkeletonCard from '@/components/SkeletonCard';
import { useRouter } from 'next/navigation';
import { Vin } from "@/lib/constants";




export default async function Vins() {
    const [vins, setVins] = useState<Vin[]>([]);
    const [isloading, setLoading] = useState(true);
    const router = useRouter()

    const formatPrice = (price: number | undefined) => {
        if (price) {
          return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return ""; // Return empty string if price is undefined
      };

    // function handleClick(id : number) {
    //     router.push(`/vins/${id}`)
    // }

    useEffect(() => {
        const fetchVins = async () => {
            try {
                const response = await fetch('/api/vins');
                const data = await response.json();
                setVins(data.vins);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vins:", error);
            }
        };

        fetchVins();
    }, []);


    return (
        <>
            {/* className='mt-48' */}
            <div className=' w-full left-0 my-0 right-0 mt-32'>
                <Image
                    src='/bgs/Ruinart_AT_HOME_StudioMB_01_1.jpeg'
                    alt=''
                    width={1265}
                    height={525}
                    className=' object-fill rounded-sm'
                />
            </div>
            <h1 className={`${styles.Produits_texte} top-48 `}>
                Nos meilleurs vins pour votre plaisir
            </h1>
            <section className={styles.section_produits}>
                {isloading ? (
                    <div className=' grid grid-cols-3 justify-center items-center'>
                        {"01234567".split('').map(i => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.produits}>
                        {
                            vins.map((vin, index) => (
                                <div className="grid justify-center">
                                    <div key={index} className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-3xl border bg-rock-800 shadow-md mb-12 ">
                                        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-2xl" href={`vins/${vin.id}`}>
                                        {/* onClick={handleClick(vin.id)} */}
                                            <Image
                                                src={vin.img}
                                                alt={vin.name}
                                                width={250}
                                                height={280}
                                                className="peer absolute top-0 right-0 left-0 h-full w-full object-contain"
                                            />
                                            <Image
                                                src={vin.img}
                                                alt={vin.name}
                                                width={250}
                                                height={280}
                                                className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0"
                                            />
                                            {/* <span className="absolute top-0 left-0 m-2 font-[Montaga] rounded-full bg-[#D9D9D9] px-2 text-center text-sm font-medium text-myblack">TOP Ventes</span> */}
                                        </a>
                                        <div className="mt-4 px-5 pb-5 bg-transparent">
                                            <a href="#">
                                                <h5 className="text-xl tracking-tight text-white bg-transparent">
                                                    {vin.name}
                                                </h5>
                                            </a>
                                            <div className="mt-2 mb-5 flex items-center bg-transparent justify-between">
                                                <p className=' bg-transparent'>
                                                    <span className="text-lg font-bold text-white  bg-transparent">{formatPrice(vin.price)} FCFA</span>
                                                    <span className="text-sm text-white line-through bg-transparent">{formatPrice(vin.price)} FCFA</span>
                                                </p>
                                            </div>
                                            <a href="#" className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-[#4A050D] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-redhot">
                                                <svg width="24" height="24" viewBox="0 0 24 24" className="mr-2 h-6 w-6 bg-transparent stroke-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 16.0001H15.2632C19.7508 16.0001 20.4333 13.1809 21.261 9.06916C21.4998 7.8832 21.6192 7.29022 21.3321 6.89515C21.1034 6.58048 20.7077 6.51645 20 6.50342" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M9 6.5H17M13 10.5V2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="10.5" cy="20.5" r="1.5" stroke="white" strokeWidth="1.5" />
                                                    <circle cx="17.5" cy="20.5" r="1.5" stroke="white" strokeWidth="1.5" />
                                                </svg>

                                                Ajouter au panier</a>

                                        </div>
                                    </div>

                                </div>

                            ))}
                    </div>
                )}


            </section>
        </>
    )
}

// <div key={i} className={styles.carte}>
//     <div className={styles.img}>
//         <Image
//             src={vins.image}
//             alt={vins.titre}
//             width={250}
//             height={280}
//         // className=' object-fill'
//         />
//     </div>
//     <button className={styles.seemore}>
//         <a className=' bg-transparent' href="vin1.jpg">
//             voir plus
//         </a>
//     </button>
//     <div className={styles.desc}>{vins.desc}</div>
//     <div className={styles.titre}>{vins.titre}</div>
//     <div className={styles.box}>
//         <div className={styles.prix}>{vins.prix}</div>
//         <button className={styles.achat}>
//             <a href="Panier.html">
//                 Acheter
//             </a>
//         </button>
//     </div>
// </div>