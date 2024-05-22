import { UserRound, UserRoundCheck } from 'lucide-react';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'


const SidebarUserIcon = () => {
    const { data: session } = useSession();

    return (
        <>
            {session?.user ? (
                <Link href='/login' className='bg-transparent'>
                    <UserRoundCheck
                        strokeWidth={2}
                        height={25}
                        width={25}
                        className=' stroke-white -mr-1 bg-transparent'
                    />
                </Link>
            ) : (
                <Link href='/login' className='bg-transparent'>
                <UserRound className='bg-transparent -mr-1 stroke-white w-[25px] h-[25px]' />
              </Link>
            )}
        </>
    )
}

export default SidebarUserIcon