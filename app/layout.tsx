import "./globals.css";
import ClientProvider from "./ClientProvider";

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
