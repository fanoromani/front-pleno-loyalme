import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const getMontserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cupons",
  description: "Teste Front End pleno Loyalme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${getMontserrat.variable}`}>{children}</body>
    </html>
  );
}
