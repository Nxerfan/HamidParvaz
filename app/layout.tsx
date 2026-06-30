"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Footer from "../app/components/Footer";
import { PassengerProvider } from "../app/lib/PassengerContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="fa" dir="rtl">
      <body suppressHydrationWarning={true}>
        <PassengerProvider>
          {children}
        </PassengerProvider>
        {pathname !== "/auth" && <Footer />}
      </body>
    </html>
  );
}
