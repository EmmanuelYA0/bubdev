import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";

export function CartCount() {
    const { cartTotalQty } = useCart()
    const check = cartTotalQty? '-bottom-2' :''
    return (
        <div className={`relative ${check}`}>
            <Link href='/panier' className='bg-transparent'>
                <Image
                    src='/basket.svg'
                    alt='basket-icon'
                    width={35}
                    height={35}
                    className=' bg-transparent hidden h-full lg:flex cursor-pointer hover:stroke-[#4A050D] hover:scale-125'
                />
            </Link>
            {cartTotalQty !== 0 &&
                <span className="flex rounded-full justify-center items-center h-4 w-4 text-sm  -top-10 left-5 bg-redhot text-white">
                    {cartTotalQty}
                </span>
            }
        </div>
    )
}
