import { SignUpForm } from '@/components/signUpForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className=' text-5xl text-slate-500 font-[Cormorant] -mb-24 flex mx-auto my-32 items-center justify-center'>Inscription</h1>
      <div className=' my-32 w-[500px] flex items-center mx-auto h-[950px] p-10 bg-slate-200 justify-center rounded-md'>
        <SignUpForm/>
      </div>
    </div>
  )
}

export default page
// mt-32 w-[400px] h-[700px] flex mx-auto flex-col
