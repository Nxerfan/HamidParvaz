import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حمید پرواز ",
  description: "سایت خرید بلیط هواپیما , تور و هتل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
