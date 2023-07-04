import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProviders";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";


export const metadata = {
  title: "Stay",
  description: "A homestaycation app",
};

const nunito = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider/>
          <LoginModal/>
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
