import type { Metadata } from "next";
import Header from "../components/(Headers)/Header3";
import Sidebar from "../components/SideBar";
export const metadata: Metadata = {
  title: "حمید پرواز ",
  description: "سایت خرید بلیط هواپیما , تور و هتل",
};

export default function OtersInMainPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
