"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user !== null && !isAdmin) {
      router.replace("/");
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
