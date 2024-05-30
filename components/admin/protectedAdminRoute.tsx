"use client";

// components/ProtectedRoute.tsx
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "@/app/loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Attendre que la session soit chargée
      return;
    }

    if (!session || session.user.role !== "ADMIN") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
