'use client';

import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/formatPrice';
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus } from 'lucide-react';

export default function CartClient() {
    const router = useRouter()
    const { cartItems, cartTotalAmount, decreaseQuantity, increaseQuantity, handleRemoveProductFromCart, handleClearCart } = useCart()
    const TVA = 100;
    const Discount = 0;
   

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className=' flex justify-center flex-col items-center h-screen'>
                <h1 className=' text-2xl'>Votre panier est vide </h1>
                <Button className='bg-pourpre mt-6' onClick={() => router.push('/vins')}> <ArrowLeft />Commencer vos achats</Button>
            </div>
        )
    }
    else {
        return (
            <div className=" mx-auto max-w-screen-xl px-1 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-2xl font-bold font-[Cormorant] text-myblack sm:text-3xl">Votre Panier</h1>
                    </header>
                    {cartItems && cartItems.map((item) => {
                        return (
                            <div className="mt-8 pt-4  border-t border-gray-300">
                                <ul key={item.id} className="space-y-4">
                                    <li className="flex items-center gap-4">
                                        {item.img ?
                                            <Image
                                                src={item.img}
                                                width={64}
                                                height={64}
                                                alt="bottle"
                                                className="rounded max-sm:size-14 object-cover"
                                            /> :
                                            <Image
                                                src=""
                                                width={64}
                                                height={64}
                                                alt="bottle"
                                                className="rounded object-cover"
                                            />
                                        }


                                        <div>
                                            {item.categoryId === 1 ? (
                                                <Link className='text-sm sm:text-xl ml-0 text-redhot' href={`vins/${item.id}`}>{item.name}</Link>
                                            ) : item.categoryId === 2 ? (
                                                <Link className='text-sm sm:text-xl ml-0 text-redhot' href={`champagnes/${item.id}`}>{item.name}</Link>
                                            ) : (
                                                <Link className='text-xs sm:text-xl ml-0 text-redhot' href={`spiritueux/${item.id}`}>{item.name}</Link>
                                            )}

                                            <dl className="mt-0.5 space-y-px sm:text-lg text-xs text-gray-600">
                                                <p>{formatPrice(item.price)} FCFA</p>
                                            </dl>
                                        </div>



                                        <div className="flex flex-1 items-center justify-end gap-2">

                                            <div className="flex items-center py-1 gap-1 max-sm:size-8 max-sm:-ml-8 ">
                                                <button type="button" className="size-10 max-sm:size-4 max-sm:-bottom-5 max-sm:left-[11px] max-sm:justify-self-center leading-10 text-gray-400 transition hover:opacity-75" onClick={() => decreaseQuantity(item)}>
                                                    <Minus className=" bg-slate-100 max-sm:size-4  rounded-sm h-6 w-6" />
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="h-8 w-10 max-sm:size-4  rounded border border-gray-200 bg-white text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                    readOnly
                                                />

                                                <button type="button" className="size-10 max-sm:size-4 max-sm:-top-5 max-sm:right-[29px] max-sm:justify-self-center leading-10 text-gray-400 transition hover:opacity-75" onClick={() => increaseQuantity(item)}>
                                                    <Plus className=" bg-slate-100 max-sm:size-4 rounded-sm h-6 w-6" />
                                                </button>
                                            </div>

                                            <p className="mt-0.5 space-y-px sm:text-sm font-semibold text-xs max-sm:w-10 text-gray-600">
                                                {item.price && item.quantity && formatPrice(item.price * item.quantity)} FCFA
                                            </p>


                                            <button onClick={() => handleRemoveProductFromCart(item)} className="text-gray-600 transition hover:text-red-600">
                                                <span className="sr-only">Remove item</span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )
                    })}
                    <div className="mt-8 flex justify-end border-t border-gray-500 pt-8">
                        <div className="w-screen max-w-lg space-y-4">
                            <dl className="space-y-0.5 text-sm text-gray-700">
                                <div className="flex font-semibold text-base text-redhot justify-between">
                                    <dt>Sous Total</dt>
                                    <dd>{formatPrice(cartTotalAmount)} FCFA</dd>
                                </div>
                                

                                <div className="flex justify-between">
                                    <dt>TVA</dt>
                                    <dd>{formatPrice(cartTotalAmount*0.18)} FCFA</dd>
                                </div>

                                <div className="flex justify-between">
                                    <dt>Réduction</dt>
                                    <dd>-{Discount} FCFA</dd>
                                </div>

                                <div className="flex justify-between !text-base font-medium">
                                    <dt>Total</dt>
                                    <dd>{formatPrice(cartTotalAmount + (cartTotalAmount*0.18) - Discount)} FCFA</dd>
                                </div>
                            </dl>
                            <div className='flex justify-end'>
                                    <p className=' text-gray-500 text-sm sm:text-base'>
                                        Frais de livraison non inclus à ce stade.
                                    </p>
                                </div>
                            <div className="flex justify-end">
                                <span
                                    className="inline-flex items-center justify-center rounded-full bg-red200 px-2.5 py-0.5 text-pourpre"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="-ms-1 me-1.5 h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                        />
                                    </svg>

                                    <p className="whitespace-nowrap text-xs">0 Bon(s) de réduction appliqué(s)</p>
                                </span>
                            </div>

                            <div className="flex justify-end gap-x-5">
                                <Button onClick={handleClearCart} variant="outline" className='h-12 text-pourpre hover:bg-red200'>Vider le panier</Button>
                                <a
                                    href="#" onClick={() => { }}
                                    className="block rounded bg-pourpre px-5 py-3 text-sm text-gray-100 transition hover:bg-pink-900"
                                >
                                    Commander
                                </a>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
