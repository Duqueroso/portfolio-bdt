import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Portfolio - BDT",
  description: "Portfolio personal de desarrollador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar>
          <PageTransition>
            {children}
          </PageTransition>
        </Navbar>
      </body>
    </html>
  );
}
