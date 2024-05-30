'use client'

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user && (pathname === "/login" || pathname === "/register")) {
      router.push("/user");
    }
  }, [session, router, pathname]);

  return <>{children}</>;
};
export default ProtectedUserRoute;
