import { FC, ReactNode} from 'react'
import { Button } from './ui/button'

interface GoogleButtonProps {
    children : ReactNode;
}

const GoogleButton : FC<GoogleButtonProps> = ({ children}) => {
    const loginWithGoogle = () => console.log();

  return (
    <Button className=' w-full mx-auto'>
      { children}
    </Button>
  )
}

export default GoogleButton
