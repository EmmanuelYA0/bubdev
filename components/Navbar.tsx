import React from 'react'
import { NAV_LINKS } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"


const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between mx-auto px-6 lg:px-20 xl:px-0 bg-transparent z-20 py-5">
        <Link href="/" >
          <Image src="/logo.png" alt="logo" width={200} height={200} className='bg-transparent' />
        </Link>

        <ul className="hidden h-full gap-5 lg:flex bg-transparent">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="regular-20 bg-transparent leading-9 flex items-center text-myblack justify-center cursor-pointer pb-1.5 transition-all hover:text-redhot font-normal font-['Sitka']">
              {link.label}
            </Link>
          ))}
        </ul>

        <Image
          src="menu-02.svg"
          alt="menu"
          width={32}
          height={32}
          className="inline-center cursor-pointer lg:hidden"
        />
        <div className='hidden lg:flex items-center justify-between gap-4 bg-transparent'>
          <Link href="/" className='bg-transparent'>
            <Image
              src='/search.svg'
              alt='serach-icon'
              width={35}
              height={35}
              className=' bg-transparent hidden h-full lg:flex cursor-pointer'
            />
          </Link>
          <Link href='/' className='bg-transparent'>
            <Image
              src='/avatar.svg'
              alt='avatar-icon'
              width={35}
              height={35}
              className='bg-transparent hidden h-full lg:flex cursor-pointer'
            />
          </Link>
          <Link href='/' className='bg-transparent'>
            <Image
              src='/basket.svg'
              alt='basket-icon'
              width={35}
              height={35}
              className=' bg-transparent hidden h-full lg:flex cursor-pointer '
            />
          </Link>
        </div>
      </nav>
      <div className='absolute top-2.5 -right-5'>
        <Image
          src='/rectangle.svg'
          alt=''
          width={500}
          height={700}
          className='hidden lg:flex z-10'
        />
      </div>
    </>
  )


}

export default Navbar