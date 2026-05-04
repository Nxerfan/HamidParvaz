import type { Metadata } from "next";
import Header from "../components/(Headers)/Header";
import TravelCards from "../components/TravelCards";
import Form1 from "../components/(Forms)/FormType1";
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
        <TravelCards />
        <Form1 />
        {children}
      </body>
    </html>
  );
}
