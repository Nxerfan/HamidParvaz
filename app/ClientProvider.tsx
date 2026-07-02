"use client";

import { usePathname } from "next/navigation";
import { PassengerProvider } from "./lib/PassengerContext";
import Footer from "./components/Footer";
import ToastProvider from "./components/Toast/ToastProvider";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ToastProvider>
      <PassengerProvider>
        {children}
        {pathname !== "/auth" && <Footer />}
      </PassengerProvider>
    </ToastProvider>
  );
}
