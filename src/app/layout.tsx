import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const getOpenSans = Open_Sans({
  variable: "--font-open-sans",
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
      <body className={`${getOpenSans.variable}`}>{children}</body>
    </html>
  );
}
