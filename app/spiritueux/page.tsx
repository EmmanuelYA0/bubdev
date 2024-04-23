import { sessionUsernameGetter } from '@/components/sessions/getSessionUsername'
import React from 'react'

export default function Spritueux(){
  const sessionUserUsername = sessionUsernameGetter()
  
  return (
    <div>
      <h1 className='text-2xl uppercase h-80 text-myblack mt-48 flex items-center justify-center'>
      page des spiritueux 
    </h1>
    
    <p>Welcome {sessionUserUsername}!</p>
    </div>
  )
}
