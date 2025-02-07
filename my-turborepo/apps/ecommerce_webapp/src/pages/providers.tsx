"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
export default function Providers({ children }: any) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
