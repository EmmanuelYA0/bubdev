import { SignInForm } from '@/components/signInForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className=' text-5xl text-slate-500 font-[Cormorant] -mb-24 flex mx-auto my-32 items-center justify-center'>Connexion</h1>
      <div className=' my-32 w-[500px] flex items-center mx-auto h-[500px] p-10 bg-slate-200 justify-center rounded-md'>
        <SignInForm />
      </div>
    </div>
  )
}

export default page
