"use client";

import { usePathname } from "next/navigation";
import { PassengerProvider } from "./lib/PassengerContext";
import { AuthProvider } from "./lib/AuthContext";
import Footer from "./components/Footer";
import ToastProvider from "./components/Toast/ToastProvider";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ToastProvider>
      <AuthProvider>
        <PassengerProvider>
          {children}
          {pathname !== "/auth" && <Footer />}
        </PassengerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}