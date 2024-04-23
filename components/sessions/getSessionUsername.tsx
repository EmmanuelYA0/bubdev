import { auth } from '@/lib/auth'

export const sessionUsernameGetter = async() => {
    const session = await auth()
  return (session?.user.username)
}


