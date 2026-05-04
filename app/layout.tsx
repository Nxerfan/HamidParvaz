"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Footer from "../app/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        {pathname !== "/auth" && <Footer />}
      </body>
    </html>
  );
}
