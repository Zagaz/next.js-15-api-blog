import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      
      <body>

        <Header />

        {children}

        <Footer />
        
      </body>
    </html>
  );
}
