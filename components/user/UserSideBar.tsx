import { KeyRound, ShoppingBag, User } from 'lucide-react'
import React from 'react'

export default function UserSideBar() {
  return (
    <div className=' left-0 -ml-6 top-28 w-60 pt-0 '>
      <div className='flex flex-col text-lg gap-5 -mt-2'>
        <p className='flex items-center text-gray-700 pl-3 gap-3  rounded-md h-10 w-60 bg-gray-200'><User/> Profil</p>
        <p className='flex items-center text-gray-700 pl-3 gap-3  rounded-md h-10 w-60'><KeyRound/>Mot de passe</p>
        <p className='flex items-center text-gray-700 pl-3 gap-3  rounded-md h-10 w-60'><ShoppingBag/>Commandes</p>
      </div>
    </div>
  )
}
