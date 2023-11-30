import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";

const poppins = Poppins({ weight: ["300", "400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Notes App",
  description: "NOTES APP BY jaguardeva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar>{children}</Navbar>
      </body>
    </html>
  );
}
