import Image from 'next/image';
import React from 'react'

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  position?:string;
}

const Button = ({ type, title, icon, variant, full, position }: ButtonProps) => {
  return (
    <>
    <button className={` ${position} absolute ${variant} rounded-md shadow justify-center items-center cursor-pointer ${full && 'w-full'} `}
        type={type}>
          {icon && <Image src={icon} alt={title} width={24} height={24} />}
          <label className=" text-base font-normal font-['Roboto'] bg-transparent cursor-pointer">{title}</label>
        </button>
    </>
  )
  
}

export default Button