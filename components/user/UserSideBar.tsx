"use client"

import { KeyRound, ShoppingBag, User } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function UserSideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href : string) => {
    return pathname === href ? " bg-gray-200 text-gray-700" : "text-gray-500"
  };


  return (
    <div className=" left-0 -ml-6 top-28 w-60 pt-0 ">
      <div className="flex flex-col text-lg gap-5 -mt-2">
        <Button className='bg-transparent hover:bg-transparent  text-base w-full' onClick={() => {router.push('/user')}}>
          <p className={`${isActive('/user')} flex items-center pl-3 gap-3  rounded-md h-10 w-60`}>
            <User />
            Profil
          </p>
        </Button>
        <Button  className='bg-transparent hover:bg-transparent  text-base w-full' onClick={() => {router.push('/user/edit-password')}}>
          <p className={`${isActive('/user/edit-password')} flex items-center pl-3 gap-3  rounded-md h-10 w-60`}>
            <KeyRound />
            Mot de passe
          </p>
        </Button>
        <Button className='bg-transparent hover:bg-transparent  text-base w-full' onClick={() => {router.push('/user/orders')}}>
          <p className={`${isActive('/user/orders')} flex items-center pl-3 gap-3  rounded-md h-10 w-60`}>
            <ShoppingBag />
            Commandes
          </p>
        </Button>
      </div>
    </div>
  );
}
