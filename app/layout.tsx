import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./ClientProvider";

const BASE_URL = "https://nxerfan.github.io/HamidParvaz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "حمید پرواز",
    template: "%s | حمید پرواز",
  },
  description:
    "سامانه جامع خرید بلیط هواپیما، رزرو هتل و تورهای مسافرتی | حمید پرواز",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/logo.webp", sizes: "200x75", type: "image/webp" },
    ],
  },
  openGraph: {
    title: "حمید پرواز",
    description:
      "سامانه جامع خرید بلیط هواپیما، رزرو هتل و تورهای مسافرتی",
    url: BASE_URL,
    siteName: "حمید پرواز",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 200,
        height: 75,
        alt: "حمید پرواز",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حمید پرواز",
    description:
      "سامانه جامع خرید بلیط هواپیما، رزرو هتل و تورهای مسافرتی",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body suppressHydrationWarning={true}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
