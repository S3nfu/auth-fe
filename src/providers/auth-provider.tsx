"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

type AuthContextType = {
  data: ReturnType<typeof useSession>["data"];
  isPending: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession();

  const value = useMemo(
    () => ({
      data,
      isPending,
    }),
    [data, isPending]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
