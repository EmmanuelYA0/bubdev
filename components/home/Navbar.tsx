'use client';
import React, { useState } from 'react'
import { NAV_LINKS } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { Search, ShoppingBasketIcon, X } from 'lucide-react';
import UserDropdown from '../sessions/UserDropdown';
import { Button } from '../ui/button';
import { CartCount } from '../cartCount';
import SearchModal from './NavbarSearch';
import SidebarUserIcon from '../sessions/SidebarUserIcon';






const Navbar = () => {

  const pathName = usePathname();

  const [open, setOpen] = useState(false);


  const isActive = (href: string) => {
    return pathName === href ? 'text-white px-6 rounded-xl min-w-16 text-center bg-pink-900' : ' bg-transparent hover:text-redhot';
  };
  {/*flex items-center justify-between w-max md:w-full sm:w-full rounded-md mx-auto px-6 lg:px-20 xl:px-0 top-0 left-0 right-0 fixed bg-transparent backdrop-blur-sm z-50 py-5*/ }


  return (
    <>
      <nav className=" flex justify-between items-center md:w-full sm:w-full rounded-md mx-auto px-6 lg:px-20 xl:px-0 top-0 left-0 right-0 fixed bg-transparent backdrop-blur-sm z-50 py-5">
        <Link href="/" className='bg-transparent' >
          <Image src="/logo.png" alt="logo" width={200} height={200} className='bg-transparent' />
        </Link>

        <ul className="hidden h-full gap-5 lg:flex bg-transparent">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className={`${isActive(link.href)} text-[20px]  leading-9 flex items-center text-myblack justify-center cursor-pointer pb-1.5 transition-all  font-normal font-['Sitka'] hover:scale-125`}>
              {link.label}
            </Link>
          ))}
        </ul>

        <button onClick={() => setOpen((prev) => !prev)}>
          <Image
            src="menu-02.svg"
            alt="menu"
            width={32}
            height={32}
            className="inline-center bg-transparent cursor-pointer lg:hidden hover:stroke-[#4A050D]"
          />
        </button>
        {open &&
          <div className='lg:hidden min-w-64 absolute top-24 left-0 w-1/3 h-[calc(100vh_-_100px)] bg-redhot'>
            <Button className='bg-transparent left-0 top-0 hover:bg-pourpre' onClick={() => setOpen(false)}>
              <X className=' stroke-white bg-transparent' />
            </Button>
            <div className='bg-transparent flex flex-col items-center justify-center gap-4'>
              {NAV_LINKS.map((link) => (
                <Link href={link.href} key={link.key} className="text-[20px] font-[400] bg-transparent  text-white leading-9 r">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className=' mt-6 flex mx-16 flex-row gap-1 bg-transparent'>
              <Link href="/" className='bg-transparent'>
                <Search className='bg-transparent -mr-1 stroke-white w-[25px] h-[25px]' />
              </Link>
              <SidebarUserIcon />
              <Link href='/panier' className='bg-transparent'>
                <ShoppingBasketIcon className='bg-transparent -mr-1 stroke-white w-[25px] h-[25px]' />
              </Link>
            </div>
          </div>
        }


        <div className='hidden lg:flex items-center justify-between gap-4 bg-transparent'>
          <SearchModal/>
          <UserDropdown />
          <CartCount />
        </div>
      </nav >

    </>
  )


}

export default Navbar