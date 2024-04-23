import { FC, ReactNode} from 'react'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react';

interface GoogleButtonProps {
    children : ReactNode;
}

const GoogleButton : FC<GoogleButtonProps> = ({ children}) => {
    const loginWithGoogle = () => signIn('google', { callbackUrl: 'http://localhost:3000/spiritueux'});

  return (
    <Button onClick={loginWithGoogle} className=' w-full mx-auto'>
      { children}
    </Button>
  )
}

export default GoogleButton
