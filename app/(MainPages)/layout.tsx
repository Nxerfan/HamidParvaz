import Header from "../components/(Headers)/Header";
import TravelCards from "../components/TravelCards";
import Form1 from "../components/(Forms)/FormType1";

export default function OtersInMainPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <TravelCards />
      <Form1 />
      {children}
    </>
  );
}
