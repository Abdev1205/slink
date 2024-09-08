'use client'

import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";

const AuthLayer = ({ children }) => {
  const { user, loading, loggedIn } = useSession();
  const router = useRouter();

  const publicRoute = ['/login', '/register', '/'];

  // Check if the current route is public
  const isPublicRoute = publicRoute.includes(router.pathname);


  if (loading) {
    return <div>Loading .......</div>
  }

  if (!loggedIn && !isPublicRoute) {
    router.push('/login');
    return null;
  }

  return (
    <div className=' w-[100%] ' >
      {children}
    </div>
  )
}

export default AuthLayer
